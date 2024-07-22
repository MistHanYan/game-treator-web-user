<template>
  <van-nav-bar
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="message"
        rows="2"
        autosize
        label="留言"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="result"
        is-link
        readonly
        name="picker"
        label="选择器"
        placeholder="点击选择城市"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
      <van-field v-model="number" type="number" label="数字" />
      <van-uploader multiple :max-size="2500 * 1024" @oversize="onOversize" />
      <van-field name="radio" label="单选框">
        <template #input>
          <van-radio-group v-model="checked" direction="horizontal">
            <van-radio name="1">单选框 1</van-radio>
            <van-radio name="2">单选框 2</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-submit-bar loading :price="3050" button-text="提交订单" @submit="onSubmit" />
    </div>
  </van-form>
</template>
<script setup lang="ts" name="Issue"></script>
