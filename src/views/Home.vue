<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <RouterView />
  </div>

  <div>
    <van-tabbar v-model="active" route v-if="$route.meta.showNav">
      <van-tabbar-item replace name="home" to="/recommend" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item replace name="issue" to="/issue" icon="add-o">发布商品</van-tabbar-item>
      <van-tabbar-item replace name="message" to="/message" icon="chat-o">消息</van-tabbar-item>
      <van-tabbar-item replace name="user" to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script setup lang="ts" name="App">
import { ref } from 'vue'

const active = ref('home')
</script>
