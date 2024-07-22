<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <van-nav-bar title="账号管理" />
  <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
  <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
  <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
  <!-- 优惠券列表 -->
</template>
<script setup lang="ts" name="User"></script>
