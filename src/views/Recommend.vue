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
            <img :src="image.img" style="max-width: 100%" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </template>
    <template #foot>
      <van-tabs v-model:active="active" swipeable sticky @click-tab="clickTab" @rendered="rendered" @change="getDefaultCommodity">
        <!-- <van-dropdown-menu ref="menuRef">
          <van-dropdown-item v-model="value" :options="options" />
        </van-dropdown-menu> -->
        <van-tab v-for="(tag,index) in tags" :key="index" :title="tag.name">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model:loading="loading[onTitle]"
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
                v-for="(item, index) in commoditsTag[onTitle]"
                :key="index"
              >
                <template #tags>
                  <van-tag plain type="primary">{{ item.tag_1 }}</van-tag>
                  <van-tag plain type="primary">{{ item.tag_2 }}</van-tag>
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
import { onMounted, reactive, ref } from 'vue'

const list = ref([])
const loading = ref<[boolean]>([false])
const finished = ref(false)
const refreshing = ref(false)
const active = ref(0)

const client = createDirectus('http://localhost').with(rest())

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
  imgs: []
  img: string
  game_classified: any
  tag_1: string
  tag_2: string
}

const tags = reactive<tag[]>([])

const onTitle = ref(0)

const images = reactive<advertising[]>([])

const commoditys = reactive<commodity[]>([])

const commoditsTag = ref<[commodity[]]>([[]]);

onMounted(() => {
  getAdvertise()
  getTags()
})

const getDefaultCommodity = async (title: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  console.log(title)
  const result = await client
    .request(
      readItems('commodity_db', {
        filter: {
          status: {
            _eq: 'published'
          },
          tag: {
            _or: [title, '官方']
          }
        }
      })
    )
    .then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        commoditys[i] = Object.assign({} as commodity, res[i])
      }
      commoditsTag.value[onTitle.value] = commoditys;
    })

  getCommodityImg()
}

const getTags = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await client
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
      for (let i = 0; i < res.length; i++) {
        tags[i] = Object.assign({} as tag, res[i])
      }
    })
}
const getAdvertise = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await client
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
      for (let i = 0; i < res.length; i++) {
        images[i] = Object.assign({} as advertising, res[i])
        images[i].img = 'http://localhost/assets/' + res[i].img
      }
    })
}

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = []
      refreshing.value = false
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1)
    }
    loading.value[onTitle.value] = false

    if (list.value.length >= 40) {
      finished.value = true
    }
  }, 1000)
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value[onTitle.value] = true
  onLoad()
}

const clickTab = async ({ title }) => {
  console.log(title)
  onTitle.value = tags.findIndex((obj) => obj.name === title)
  if (commoditsTag.value[onTitle.value] === null || commoditsTag.value[onTitle.value] === undefined) {
    loading.value[onTitle.value] = true // 设置加载状态

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await client
      .request(
        readItems('commodity_db', {
          filter: {
            status: {
              _eq: 'published'
            },
            tag: {
              _eq: title
            }
          }
        })
      )
      .then((res: any) => {
        for (let i = 0; i < res.length; i++) {
          commoditys[i] = Object.assign({} as commodity, res[i])
        }
        console.log("获取的标签分类数据:  "+res)
        commoditsTag.value[onTitle.value] = commoditys
      })
    console.log("当前商品池子：  "+commoditsTag)
  }

  await getCommodityImg()
}

const rendered = (name: string | number, title: string) => {
  getDefaultCommodity()
}

const getCommodityImg = async () => {
  for (let i = 0; i < commoditys.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await client
      .request(
        readItems('commodity_db_files', {
          filter: {
            id: {
              _eq: commoditys[i].imgs[0]
            }
          }
        })
      )
      .then((res: any) => {
        commoditys[i].img = 'http://localhost/assets/' + res[0].directus_files_id
      })
  }
}
</script>
