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
        <van-swipe-item v-for="(image, index) in slideshowImages" :key="index">
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
  <van-dialog v-model:show="announcementShow" :title="announcementContent.title">
    <p>{{ announcementContent.content }}</p>
  </van-dialog>

  <van-dialog v-model:show="popUpAdShow" :title="popUpAd.theme" show-cancel-button>
    <div class="container">
      <a :href="popUpAd.link">
        <img :src="'http://localhost/assets/' + popUpAd.img" />
      </a>
    </div>
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
const slideshowImages = reactive<Array<slideshow>>([])
const commoditsTag = ref<Array<Array<commodity>>>([[]])
const error = ref<boolean>(false)
const page = ref<Array<number>>([])
const announcementShow = ref<boolean>(false)
const popUpAdShow = ref<boolean>(false)
const popUpAd = reactive<advertising>({
  id: 0,
  theme: '',
  img: '',
  link: ''
})
const announcementContent = reactive<announcement>({
  id: 0,
  title: '',
  content: ''
})

interface advertising {
  id: number
  theme: string
  img: string
  link: string
}

interface announcement {
  id: number
  title: string
  content: string
}

interface slideshow {
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
  getSlideshow()
  getTags()
  getPopUpAd()
  getAnnouncement()
})

watch(active, () => {
  if (active.value === 0) {
    console.log('active', active.value)
  } else {
    finished.value = false
  }
})

/**
+ * Asynchronously loads more commodities based on the current active tag and page.
+ *
+ * This function checks if the length of the current active tag's commodities is
+ * zero, null, greater than or equal to 10, or undefined. If any of these conditions
+ * are met, it sets a timeout of 800 milliseconds. During this timeout, it checks
+ * if the refreshing flag is false. If it is, it calls the getCommoditysByTag
+ * function and sets the refreshing flag to false. It also sets the loading flag
+ * to false and increments the page value for the current active tag.
+ *
+ * If none of the conditions are met, it sets the refreshing and loading flags to
+ * false.
+ *
+ * @return {Promise<void>} A promise that resolves when the function is complete.
+ */
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

/**
+ * Refreshes the list data and reloads it.
+ *
+ * @return {Promise<void>} A promise that resolves when the list is refreshed and reloaded.
+ */
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

/**
+ * Retrieves tags from the 'game_db' table based on the 'status' field.
+ * Initializes the 'commoditsTag' array with empty arrays for each tag.
+ * Initializes the 'loading' array to false.
+ * Initializes the 'page' array with zeros for each tag.
+ *
+ * @return {Promise<void>} - A promise that resolves when the tags are retrieved and processed.
+ */
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

/**
+ * Retrieves commodities by tag based on the current active tab and page.
+ *
+ * @return {Promise<void>} - A promise that resolves when the commodities are retrieved and processed.
+ */
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
            limit: 10,
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

const getSlideshow = async () => {
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
      slideshowImages.push(...res)
    })
}

/**
+     * Retrieves the default commodity from the 'commodity_db' table based on the current page and active value.
+     * Logs the default page number to the console.
+     * Fetches the commodities with the status 'published' and tags '推荐' or '官方'.
+     * If the length of commoditsTag is greater than or equal to 10, appends the retrieved commodities to the existing ones.
+     * Otherwise, assigns the retrieved commodities to commoditsTag.
+     * If the length of the retrieved commodities is less than 10, sets finished to true.
+     * Sets loading to false.
+     *
+     * @return {Promise<void>} - A promise that resolves when the default commodity is retrieved and processed.
+     */
const getDefaultCommodity = async () => {
  console.log('default page: ', page.value[active.value] + 1)
  // 获取推荐商品
  await client
    .request(
      readItems('commodity_db', {
        fields: ['*', 'imgs.*'],
        page: page.value[active.value] + 1,
        limit: 10,
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

/**
+ * Navigates to the commodity page with the given ID as a query parameter.
+ *
+ * @param {number} id - The ID of the commodity.
+ * @return {void} This function does not return a value.
+ */
const goCommodity = (id: number) => {
  router.push({ name: 'commodity', query: { id: id } })
}

/**
+ * Retrieves the latest announcement from the server and displays it in a modal.
+ *
+ * @return {Promise<void>} A promise that resolves when the announcement is retrieved and displayed.
+ */
const getAnnouncement = async () => {
  await client
    .request(
      readItems('announcement_db', {
        limit: 1
      })
    )
    .then((res: any) => {
      Object.assign(announcementContent, res[0]) // res
      announcementShow.value = true
    })
}

/**
+ * Retrieves the pop-up advertisement from the server.
+ *
+ * @return {Promise<void>} A promise that resolves when the advertisement is retrieved.
+ */
const getPopUpAd = async () => {
  await client
    .request(
      readItems('advertising', {
        limit: 1
      })
    )
    .then((res: any) => {
      if (res.length > 0) {
        Object.assign(popUpAd, res[0])
        popUpAdShow.value = true
      }
      //images.push(...res)
    })
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%; /* 设置容器宽度 */
  margin: 0 auto; /* 居中显示 */
  //border: 1px solid #ccc; /* 边框样式，可选 */
  //padding: 10px; /* 内边距，可选 */
}

.container img {
  max-width: 100%; /* 让图片宽度自适应容器 */
  height: auto; /* 保持原始宽高比例 */
  display: block; /* 去除图片默认的间距 */
  margin: 0 auto; /* 图片水平居中 */
}
</style>
