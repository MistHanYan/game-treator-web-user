<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/valid-template-root -->
<template>
  <div>
    <div>
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div>
      <van-swipe :loop="false" lazy-render>
        <van-swipe-item v-for="(image, index) in commodityInId.imgs" :key="index">
          <div class="commodity-container">
            <img
              :src="'http://mist-home:40067/assets/' + image.directus_files_id"
              alt="商品图片"
              class="commodity-container-img"
            />
          </div>
        </van-swipe-item>
      </van-swipe>

      <div
        style="
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
          align-items: center;
          border-bottom: 1px solid #ccc;
        "
      >
        <div class="price">
          <div style="font-size: 0.8em">售价：</div>
          {{ commodityInId.price }}
          <span>¥</span>
        </div>
        <div style="display: flex; flex-direction: column; margin-top: 15px; margin-right: 15px">
          <div>
            <van-icon name="star-o" />
          </div>
          <div style="font-size: 0.45em">收藏</div>
        </div>
      </div>

      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
          margin-bottom: 10px;
        "
      >
        <div style="margin-left: 10px">
          {{ commodityInId.name }}
        </div>
        <div>
          <van-tag type="primary" round>{{ commodityInId.tag }}</van-tag>
          <van-tag type="primary" round>{{ commodityInId.tag_1 }}</van-tag>
          <van-tag type="primary" round>{{ commodityInId.tag_2 }}</van-tag>
        </div>
      </div>

      <div class="describe">{{ commodityInId.describe }}</div>
    </div>
    <div>
      <van-submit-bar :price="commodityInId.price * 100" button-text="购买" @submit="onSubmit" />
    </div>
  </div>
</template>
<script setup lang="ts" name="Commodity">
import { onMounted, reactive } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import type { commodity } from '@/types/commodity'
import { getCommodityById } from '@/apis/get/get-commodity'
import { getGeneratedOrder } from '@/apis/post/add-commodity'

const commodityInId = reactive<commodity>({
  id: 0,
  name: '',
  price: 0,
  describe: '',
  tag: '',
  status: '',
  user_create: '',
  date_create: '',
  imgs: [],
  game_classified: null,
  tag_1: '',
  tag_2: '',
  user_account: 0,
  promotion: ''
})

const route = useRoute()

onMounted(() => {
  getCommodityById(route.query.id, commodityInId)
})

const onSubmit = async () => {
  await getGeneratedOrder(commodityInId.id, commodityInId.user_account)
}

const onClickLeft = () => {
  router.back()
}
</script>

<style lang="scss">
.commodity-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* 设置容器高度 */
  background-color: black;
  margin: 0 auto;
  border: 1px solid #ccc; /* 边框样式，可选 */
}

.commodity-container-img {
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  max-height: 100%;
}

.price {
  color: red;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-top: 15px;
  span {
    font-size: 14px;
    text-decoration: line-through;
  }
  display: flex;
  justify-content: center;
}

.describe {
  margin: 10px, 10px, 10px, 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  font-size: 15px;
  color: #666;
  margin-top: 20px;
  margin-left: 15px;
  margin-right: 15px;
  background-color: #f5f5f5;
  min-height: 200px;
}
</style>
