<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <login-layout style="max-height: 100%">
    <template #header>
      <van-nav-bar title="启帆交易商城">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </template>
    <template #body>
      <van-swipe :autoplay="6000" lazy-render>
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <a :href="image.link">
            <img
              :src="'http://localhost/assets/' + image.img"
              style="max-width: 100%"
              alt="推广图"
            />
          </a>
        </van-swipe-item>
      </van-swipe>
    </template>
    <template #foot>
      <van-tabs v-model:active="active" swipeable sticky>
        <van-tab v-for="(tag, index) in tags" :key="index" :title="tag.name">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error="error"
              @load="onLoad"
              style="max-height: 100%; max-width: 100%"
            >
              <van-card
                :price="item.price"
                :desc="item.describe"
                :tag="item.tag"
                :title="item.name"
                class="goods - card"
                :thumb="'http://localhost/assets/' + item.imgs[0].directus_files_id"
                style="min-width: 100%"
                v-for="(item, inde) in commoditsTag[active]"
                :key="inde"
                @click="goCommodity(item.id)"
              >
                <template #tags>
                  <van-tag plain type="primary" v-if="item.tag_1 !== null">{{
                    item.tag_1
                  }}</van-tag>
                  <van-tag plain type="primary" v-if="item.tag_2 !== null">{{
                    item.tag_2
                  }}</van-tag>
                </template>
              </van-card>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </template>
  </login-layout>
  <van-dialog v-model:show="notificationShow" title="标题" show-cancel-button>
    <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />
  </van-dialog>
</template>

<script setup lang="ts" name="User">
import { LoginLayout } from '@/components/YuLayout'
import router from '@/router'
import { createDirectus, readItems, rest } from '@directus/sdk'
import { onMounted, reactive, ref, watch } from 'vue'

const loading = ref<boolean>()
const finished = ref(false)
const refreshing = ref(false)
const active = ref<number>(0)
const client = createDirectus('http://localhost').with(rest())
const tags = reactive<Array<tag>>([])
const images = reactive<Array<advertising>>([])
const commoditsTag = ref<Array<Array<commodity>>>([[]])
const error = ref<boolean>(false)
const page = ref<Array<number>>([])
const notificationShow = ref<boolean>(false)
const popUpAdShow = ref<boolean>(false)

interface advertising {
  id: number
  status: string
  img: string
  theme: string
  link: string
}

interface tag {
  id: number
  name: string
  log: string
}

interface commodity {
  id: number
  name: string
  price: number
  describe: string
  tag: string
  status: string
  user_create: string
  date_create: string
  imgs: Array<img>
  img: string
  game_classified: any
  tag_1: string
  tag_2: string
}

interface img {
  id: number
  directus_files_id: string
  commodity_db_id: number
}

onMounted(() => {
  getAdvertise()
  getTags()
})

watch(active, () => {
  if (active.value === 0) {
    console.log('active', active.value)
  } else {
    finished.value = false
  }
})

const onLoad = async () => {
  if (
    commoditsTag.value[active.value].length === 0 ||
    commoditsTag.value[active.value].length === null ||
    commoditsTag.value[active.value].length >= 10 ||
    commoditsTag.value[active.value].length === undefined
  ) {
    setTimeout(async () => {
      if (!refreshing.value) {
        await getCommoditysByTag().catch(() => {
          error.value = true
        })
        refreshing.value = false
      }
      loading.value = false
      page.value[active.value] = page.value[active.value] + 1
    }, 800)
  } else {
    refreshing.value = false
    loading.value = false
  }
}

const onRefresh = async () => {
  // 清空列表数据
  finished.value = false
  refreshing.value = false
  commoditsTag.value[active.value] = []
  page.value[active.value] = 0

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}

const getTags = async () => {
  await client
    .request(
      readItems('game_db', {
        filter: {
          status: {
            _eq: 'published'
          }
        }
      })
    )
    .then((res: any) => {
      tags.push(...res)
      commoditsTag.value = tags.map(() => []) // 初始化 commoditsTag 数组
      loading.value = false // 初始化 loading 数组
      page.value = tags.map(() => 0)
    })
}

const getCommoditysByTag = async () => {
  console.log('active', active.value)
  console.log('active', refreshing.value)
  if (
    commoditsTag.value[active.value].length === 0 ||
    commoditsTag.value[active.value].length >= 10
  ) {
    // 推荐页面请求
    if (active.value === 0) {
      await getDefaultCommodity()
    } else {
      await client
        .request(
          readItems('commodity_db', {
            fields: ['*', 'imgs.*'],
            page: page.value[active.value] + 1,
            filter: {
              _and: [
                {
                  status: {
                    _eq: 'published'
                  }
                },
                {
                  game_classified: {
                    id: {
                      _eq: tags[active.value].id
                    }
                  }
                }
              ]
            }
          })
        )
        .then((res: any) => {
          // 如果请求数据长度小于10，则数据加载完毕
          if (res.length < 10) {
            commoditsTag.value[active.value] = res
            finished.value = true
          } else {
            commoditsTag.value[active.value].push(...res)
          }

          loading.value = false
        })
    }
  }
}

const getAdvertise = async () => {
  await client
    .request(
      readItems('slideshow_db', {
        filter: {
          status: {
            _eq: 'published'
          }
        }
      })
    )
    .then((res: any) => {
      images.push(...res)
    })
}

const getDefaultCommodity = async () => {
  console.log('default page: ', page.value[active.value] + 1)
  // 获取推荐商品
  await client
    .request(
      readItems('commodity_db', {
        fields: ['*', 'imgs.*'],
        page: page.value[active.value] + 1,
        filter: {
          _and: [
            {
              status: {
                _eq: 'published'
              }
            },
            {
              _or: [
                {
                  tag: {
                    _eq: '推荐'
                  }
                },
                {
                  tag: {
                    _eq: '官方'
                  }
                }
              ]
            }
          ]
        }
      })
    )
    .then((res: any) => {
      if (commoditsTag.value[active.value].length >= 10) {
        commoditsTag.value[active.value].push(...res)
      } else {
        commoditsTag.value[active.value] = res
      }
      // const index = tags.findIndex((tag) => tag.name === title)

      // 如果请求数据长度小于10，则数据加载完毕
      if (res.length < 10) {
        finished.value = true
      }
      loading.value = false
    })
}

const goCommodity = (id: number) => {
  router.push({
    name: 'commodity',
    query: {
      id
    }
  })
}

const getNotification = async () => {}

const getPopUpAd = async () => {}
</script>
