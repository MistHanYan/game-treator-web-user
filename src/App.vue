<template>
  <!-- eslint-disable vue/multi-word-component-names -->
      <RouterView />


      <van-tabbar route>
        <van-tabbar-item replace to="/recommend" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/issue" icon="add-o">发布商品</van-tabbar-item>
        <van-tabbar-item replace to="/message" icon="home-o">消息</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
</template>

<script setup lang="ts" name="App">
import router from "@/router/index.js";
import { getCookie } from "@/utils/Cookie.js";
import { LoginLayout } from '@/components/YuLayout'
import { onMounted } from 'vue'

onMounted(() => {
  defaultRoute()
})
const defaultRoute = () => {
  router.push('/recommend')
}

if (getCookie('directus_session_token') != null) {
  router.push('/recommend');
} else {
  router.push('/login')
}

</script>
