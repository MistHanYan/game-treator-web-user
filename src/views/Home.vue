<template>
  <login-layout>
    <template #body>
      <RouterView />
    </template>
    <template #foot>
      <van-tabbar route>
        <van-tabbar-item replace to="/recommend" icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item replace to="/issue" icon="add-o">标签</van-tabbar-item>
        <!-- <van-tabbar-item replace to="/recommend" icon="home-o">标签</van-tabbar-item> -->
        <van-tabbar-item replace to="/user" icon="user-o">标签</van-tabbar-item>
      </van-tabbar>
    </template>
  </login-layout>
</template>
<script setup lang="ts" name="Home">
import { LoginLayout } from '@/components/YuLayout'
import router from '@/router'
import { showToast } from 'vant'
import { onMounted, ref } from 'vue'

onMounted(() => {
  defaultRoute()
})

const active = ref(0)
const onChange = (index) => showToast(`标签 ${index}`)
const defaultRoute = () => {
  router.push('/recommend')
}
</script>
