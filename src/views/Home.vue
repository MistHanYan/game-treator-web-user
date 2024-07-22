<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <login-layout>
    <template #body>
      <RouterView />
    </template>
    <template #foot>
      <van-tabbar route>
        <van-tabbar-item replace to="/recommend" icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item replace to="/issue" icon="add-o">发布商品</van-tabbar-item>
        <van-tabbar-item replace to="/message" icon="home-o">消息</van-tabbar-item>
        <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </template>
  </login-layout>
</template>
<script setup lang="ts" name="Home">
import { LoginLayout } from '@/components/YuLayout'
import router from '@/router'
import { onMounted } from 'vue'

onMounted(() => {
  defaultRoute()
})
const defaultRoute = () => {
  router.push('/recommend')
}
</script>
