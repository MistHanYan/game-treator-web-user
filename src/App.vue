<template>
  <Home/>
</template>

<script setup lang="ts" name="App">
import router from '@/router/index.js'
import { getCookie } from '@/utils/Cookie.js'
import Home from '@/views/Home.vue'
if (getCookie('directus_session_token') != null) {
  router.push('/home')
} else {
  router.push('/login')
}
</script>
