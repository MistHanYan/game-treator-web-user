<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
  <login-layout>
    <template #header>
      <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    </template>
    <template #body>
      
          <van-swipe  loop="false" lazy-render>
             
          <van-swipe-item v-for="image in commodity.imgs" :key="image">
            <div class="container">
              <img 
          :src="'http://localhost/assets/'+image.directus_files_id" 
          alt="商品图片"/>
            </div>
        </van-swipe-item>
      </van-swipe>
     
      <van-row>
        <van-col span="24">
          <div>{{ commodity.name }}</div>
          <div>{{ commodity.tag }}</div>
          <div>{{ commodity.tag_1 }}</div>
          <div>{{ commodity.tag_2 }}</div>
          <div>¥{{ commodity.price }}</div>
        </van-col>
        <van-col span="24">
        <div>
          {{ commodity.describe }}
        </div>
        </van-col>
      </van-row>
    </template>
    <template #foot>
      <van-submit-bar :price="commodity.price*100" button-text="购买" @submit="onSubmit" />
    </template>
  </login-layout>
</template>
<script setup lang="ts" name="Commodity">
import { onMounted, reactive, ref } from 'vue'
import { LoginLayout } from '@/components/YuLayout'
import router from '@/router'
import { createDirectus, readItems, rest } from '@directus/sdk'
import { useRoute } from 'vue-router'

const commodity = reactive({})

const directus = createDirectus('http://localhost').with(rest())
const route = useRoute()

onMounted(() => {
  getCommodity()
})

const getCommodity = async () => {
  console.log(route.query.id)
  await directus.request(
    readItems('commodity_db', {
      fields: ['*', 'imgs.*'],
      filter: {
        id: {
          _eq: route.query.id
        }
      }
    })
  ).then((res) => {
      Object.assign(commodity, res[0])
    })
}
const onSubmit = () => {
  router.push({
    name: 'order'
  })
}

const onClickLeft = () => {
  router.back()
}
const addToCollection = () => {}
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
</style>
