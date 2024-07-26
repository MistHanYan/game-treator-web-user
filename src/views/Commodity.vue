<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
  <login-layout>
    <template #header>
      <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    </template>
    <template #body>
      <van-swipe :loop="false" lazy-render>
        <van-swipe-item v-for="(image, index) in commodityInId.imgs" :key="index">
          <div class="container">
            <img :src="'http://localhost/assets/' + image.directus_files_id" alt="商品图片" />
          </div>
        </van-swipe-item>
      </van-swipe>

      <van-row>
        <van-col span="12">
          <van-row>
            <van-col span="24">
              <div class="price">¥ {{ commodityInId.price }}</div>
            </van-col>
            <van-col span="24">
              <div>{{ commodityInId.name }}</div>
              <van-tag round type="primary">{{ commodityInId.tag }}</van-tag>
              <van-tag round type="primary">{{ commodityInId.tag_1 }}</van-tag>
              <van-tag round type="primary">{{ commodityInId.tag_2 }}</van-tag>
            </van-col>
          </van-row>
        </van-col>
        <van-col> </van-col>
        <van-col span="24">
          <div>{{ commodityInId.describe }}</div>
        </van-col>
      </van-row>
    </template>
    <template #foot>
      <van-submit-bar :price="commodityInId.price * 100" button-text="购买" @submit="onSubmit" />
    </template>
  </login-layout>
</template>
<script setup lang="ts" name="Commodity">
import { onMounted, reactive } from 'vue'
import { LoginLayout } from '@/components/YuLayout'
import router from '@/router'
import { useRoute } from 'vue-router'
import type { commodity } from '@/types/commodity/commodity'
import { getCommodityById } from '@/apis/get/get-commodity'

const commodityInId = reactive<commodity>({
  id: 0,
  name: '',
  price: 0,
  describe: '',
  tag: '',
  status: '',
  user_create: '',
  date_create: '',
  imgs: [],
  img: '',
  game_classified: undefined,
  tag_1: '',
  tag_2: ''
})

const route = useRoute()

onMounted(() => {
  getCommodityById(route.query.id, commodityInId)
})

const onSubmit = () => {
  getOrder(commodityInId.id)
  router.push({
    name: 'order',
    query: {
    id: commodityInId.id
  }})
}

const onClickLeft = () => {
  router.back()
}
</script>

<style lang="scss">
// .container {
//   width: 100%;
//   height: 45%; /* 设置容器宽度 */
//   margin: 0 auto; /* 居中显示 */
//   //border: 1px solid #ccc; /* 边框样式，可选 */
//   //padding: 10px; /* 内边距，可选 */
// }

// img {
//   max-width: 100%; /* 让图片宽度自适应容器 */
//   height: auto; /* 保持原始宽高比例 */
//   display: block; /* 去除图片默认的间距 */
//   margin: 0 auto; /* 图片水平居中 */
// }

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* 设置容器高度 */
  background-color: black;
  margin: 0 auto;
  border: 1px solid #ccc; /* 边框样式，可选 */
}

.container img {
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  max-height: 100%;
}

.price {
  color: red;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;

  span {
    font-size: 14px;
    text-decoration: line-through;
  }
}
</style>
