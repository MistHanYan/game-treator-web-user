<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <van-nav-bar title="账号管理" />
  <div
    style="
      min-width: 100%;
      height: 210px;
      background-color: aquamarine;
      margin: 0 auto;
      padding: 10px;
      box-sizing: border-box;
      font-size: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      text-align: center;
      color: slategray;
    "
  >
    <div>
      <div>
        <van-image
          round
          width="4.5rem"
          height="4.5rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </div>
      <div>用户名：Mist</div>
      <div>标签</div>
      <div>lv. ------</div>
    </div>
  </div>
  <van-cell-group>
    <van-cell title="我的订单" value="内容" />
    <van-cell title="我的商品" value="内容" />
    <van-cell title="我的收藏" value="内容" />
  </van-cell-group>
</template>
<script setup lang="ts" name="User"></script>
