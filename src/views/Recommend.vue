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
            <img :src="image.img" style="max-width: 100%" alt="推广图" />
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
              @load="onLoad"
              style="max-height: 100%; max-width: 100%"
            >
              <van-card
                :price="item.price"
                :desc="item.describe"
                :tag="item.tag"
                :title="item.name"
                class="goods - card"
                :thumb="item.img"
                style="min-width: 100%"
                v-for="(item, inde) in commoditsTag[active]"
                :key="inde"
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
</template>

<script setup lang="ts" name="User">
import { LoginLayout } from '@/components/YuLayout'
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
  imgs: Array<string>
  img: string
  game_classified: any
  tag_1: string
  tag_2: string
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
    commoditsTag.value[active.value].length === null
  ) {
    setTimeout(() => {
      if (!refreshing.value) {
        getCommoditysByTag(tags[active.value].name)
        refreshing.value = false
      }
      loading.value = false
    }, 800)
  } else {
    refreshing.value = false
    loading.value = false
    if (commoditsTag.value[active.value].length < 15) {
      finished.value = true
    }
  }
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}

/**
 * Retrieves tags from the 'game_db' with a status of 'published'.
 */
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
    })
}

/**
 * Asynchronously retrieves commodities by tag from the 'commodity_db' collection based on the provided title.
 *
 * @param {string} title - The tag to filter commodities by.
 * @return {Promise<void>} A promise that resolves when commodities have been retrieved and assigned to the 'commoditsTag' array.
 */
const getCommoditysByTag = async (title: string) => {
  if (commoditsTag.value[active.value].length === 0) {
    // 推荐页面请求
    if (active.value === 0) {
      await getDefaultCommodity()
    } else {
      await client
        .request(
          readItems('commodity_db', {
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
          commoditsTag.value[active.value] = res
          // const index = tags.findIndex((tag) => tag.name === title)

          // 如果请求数据长度小于15，则数据加载完毕
          if (res.length < 15) {
            finished.value = true
          }
          loading.value = false
        })
    }

    await getCommodityImg()
  }
}

/**
 * Asynchronously retrieves the images for each commodity from the 'commodity_db_files' collection and assigns them to the 'img' property of each commodity.
 *
 * @return {Promise<void>} A promise that resolves when all images have been retrieved and assigned.
 */
const getCommodityImg = async () => {
  for (let i = 0; i < commoditsTag.value[active.value].length; i++) {
    await client
      .request(
        readItems('commodity_db_files', {
          filter: {
            id: {
              _eq: commoditsTag.value[active.value][i].imgs[0]
            }
          }
        })
      )
      .then((res: any) => {
        commoditsTag.value[active.value][i].img =
          'http://localhost/assets/' + res[0].directus_files_id
      })
  }
}

/**
 * Retrieves the advertisements from the 'slideshow_db' collection and assigns them to the 'images' array.
 *
 * @return {Promise<void>} A promise that resolves when the advertisements are successfully retrieved and assigned.
 */
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
      images.forEach((image) => {
        image.img = 'http://localhost/assets/' + image.img
      })
    })
}

const getDefaultCommodity = async () => {
  await client
    .request(
      readItems('commodity_db', {
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
      commoditsTag.value[active.value] = res
      // const index = tags.findIndex((tag) => tag.name === title)

      // 如果请求数据长度小于15，则数据加载完毕
      if (res.length < 15) {
        finished.value = true
      }
      loading.value = false
    })
}
</script>
