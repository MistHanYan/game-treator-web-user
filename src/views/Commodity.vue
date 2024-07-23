<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
  <login-layout>
    <template #header>
      <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    </template>
    <template #body>
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in images" :key="image">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </template>
    <template #foot>
      <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
    </template>
  </login-layout>
</template>
<script setup lang="ts" name="Commodity">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LoginLayout } from '@/components/YuLayout'
import router from '@/router'

const props = defineProps({})

const images = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
]

const commodity = reactive({})

const getCommodity = () => {}
const onSubmit = () => {
  router.push({
    name: 'order'
  })
}
const addToCollection = () => {}
</script>
