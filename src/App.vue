<template>
  <div
    style="width: 100%; min-height: 100hv; top: 0; bottom: 0; left: 0; right: 0; position: absolute"
  >
    <Home />
  </div>
</template>

<script setup lang="ts" name="App">
import router from '@/router/index.js'
import { getCookie } from '@/utils/Cookie.js'
import Home from '@/views/Home.vue'
if (getCookie('directus_session_token') != null) {
  router.push('/recommend')
} else {
  router.push('/login')
}
</script>
