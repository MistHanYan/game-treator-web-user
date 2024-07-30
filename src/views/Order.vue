<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="background-color: cyan; width: 100%; min-height: 100vh; position: absolute">
    <div><van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" /></div>
    <div>
      <div style="display: flex; justify-content: center">
        <h3 style="color: #000">确认订单</h3>
      </div>
      <div style="display: flex; flex-direction: column">
        <div>
          <van-cell-group inset>
            <van-cell title="订单编号" :value="order.order_num" />
            <van-cell title="订单创建时间" :value="order.date_created" />
            <van-cell title="订单支付有效期" value="至订单创建后30分钟" />
            <van-cell title="收货账号" :value="order.receiving_account_id?.account" />
            <van-cell title="商品名称" :value="order.commodity_id?.name" />
            <van-cell
              title="商品标签"
              :value="
                order.commodity_id?.tag +
                ',' +
                order.commodity_id?.tag_1 +
                ',' +
                order.commodity_id?.tag_2
              "
            />
            <van-cell title="商品描述" :value="order.commodity_id?.describe" />
            <van-cell title="支付方式" value="支付宝" />
            <van-cell title="应付金额" :value="order.price"> </van-cell>
          </van-cell-group>
        </div>
        <div style="margin-top: 1.5em">
          <van-button type="primary" block round @click="onSubmit">支付订单</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="Order">
import { getAliPayHTML, getOrderById } from '@/apis/get/get-commodity'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import type { Order } from '@/types/commodity'

const route = useRoute()
const order = reactive<Order>({
  id: 0,
  status: '',
  sort: null,
  date_created: '',
  date_updated: null,
  date_end: null,
  price: 0,
  order_num: '',
  user_created: null,
  user_updated: null,
  commodity_id: null,
  receiving_account_id: null,
  customer_id: null
})

onMounted(async () => {
  await getOrderById(route.query.order_id, order)
})

const onClickLeft = () => {
  router.back()
}

const onSubmit = async () => {
  await getAliPayHTML(order.order_num)
}
</script>
