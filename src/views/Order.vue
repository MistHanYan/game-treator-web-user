<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <login-layout>
    <template #header>
      <div><van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" /></div>
    </template>
    <template #body>
      <div>
        <div>
          <van-cell-group>
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="单元格" value="内容"> </van-cell>
          </van-cell-group>
        </div>
      </div>
    </template>
    <template #foot> </template>
  </login-layout>
</template>
<script setup lang="ts" name="Order">
import { getOrderById } from '@/apis/get/get-commodity'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { LoginLayout } from '@/components/YuLayout'
import router from '@/router'

const route = useRoute()
const order = reactive({
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

onMounted(() => {
  //getOrderById(route.query.id)
})

const onClickLeft = () => {
  router.back()
}

const onSubmit = () => {
  console.log('submit')
}
</script>
