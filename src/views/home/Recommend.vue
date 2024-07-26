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
                v-for="(item, index) in commoditsTag[active]"
                :key="index"
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
import { onMounted, reactive, ref, watch } from 'vue'
import { type tag, type slideshow, type advertising, type announcement } from '@/types/sys/page'
import type { commodity } from '@/types/commodity/commodity'
import { getAnnouncement, getPopUpAd, getSlideshow, getTags } from '@/apis/get/get-sys'
import { getCommoditysByTag } from '@/apis/get/get-commodity'

const loading = ref<boolean>()
const finished = ref(false)
const refreshing = ref(false)
const active = ref<number>(0)
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

onMounted(() => {
  getSlideshow(slideshowImages)
  getTags(tags, commoditsTag, loading, page)
  getPopUpAd(popUpAd, popUpAdShow)
  getAnnouncement(announcementContent, announcementShow)
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
        await getCommoditysByTag(
          active,
          page,
          commoditsTag,
          tags,
          loading,
          refreshing,
          finished
        ).catch(() => {
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
+ * Navigates to the commodity page with the given ID as a query parameter.
+ *
+ * @param {number} id - The ID of the commodity.
+ * @return {void} This function does not return a value.
+ */
const goCommodity = (id: number) => {
  router.push({ name: 'commodity', query: { id: id } })
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%; /* 设置容器宽度 */
  margin: 0 auto; /* 居中显示 */
  //border: 1px solid #ccc; /* 边框样式，可选 */
  //padding: 10px; /* 内边距，可选 */
  max-height: 75vh;
}

.container img {
  max-width: 100%; /* 让图片宽度自适应容器 */
  height: auto; /* 保持原始宽高比例 */
  display: block; /* 去除图片默认的间距 */
  margin: 0 auto; /* 图片水平居中 */
}
</style>
