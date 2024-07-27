<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <login-layout>
    <template #header>
      <div><van-nav-bar title="确认订单" left-text="返回" left-arrow @click-left="onClickLeft" /></div>
    </template>
    <template #body>
      <div style="background-color: cyan; top: 0; left: 0 ; width: 100%; height: 100vh">
        <div style="display: flex; justify-content: center">
          <h3 style="color: #000"></h3>
        </div>
        <div>
          <van-cell-group inset>
            <van-cell title="订单编号" value="内容" />
            <van-cell title="商品名称" value="内容" />
            <van-cell title="商品标签" value="内容" />
            <van-cell title="商品描述" value="内容" />
            <van-cell title="商品图片" value="内容" />
            <van-cell title="下单时间" value="内容" />
            <van-cell title="支付时间" value="内容" />
            <van-cell title="收货账号" value="内容" />
            <van-cell title="单元格" value="内容" />
            <van-cell title="价格" value="内容"> </van-cell>
          </van-cell-group>
        </div>
      </div>
    </template>
    <template #foot><div>
        <van-submit-bar :price="3050" button-text="支付订单" @submit="onSubmit" 
        button-type="primary"/>
    </div> </template>
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
