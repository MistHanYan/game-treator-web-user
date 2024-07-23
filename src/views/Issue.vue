<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <van-nav-bar
    title="发布商品"
    left-text="返回"
    right-text="保存"
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
        label="描述："
        type="textarea"
        maxlength="50"
        placeholder="请输入商品描述"
        show-word-limit
      />
      <van-field
        v-model="commodityName"
        name="标题"
        label="标题"
        placeholder="商品标题"
        :rules="[{ required: true, message: '请填写商品标题' }]"
      />
      <van-field
        v-model="result"
        is-link
        readonly
        name=" game_classified"
        label="游戏分类"
        placeholder="点击选择游戏分类"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
      <van-field v-model="number" type="number" label="售价" placeholder="请输入售价" />
      <van-uploader multiple :max-size="2500 * 1024" @oversize="onOversize" />
      <van-field name="radio" label="是否加速出售">
        <template #input>
          <van-radio-group v-model="checked" direction="horizontal">
            <van-radio name="1">是</van-radio>
            <van-radio name="2">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-submit-bar loading :price="3050" button-text="发布商品" @submit="onSubmit" />
    </div>
  </van-form>
</template>
<script setup lang="ts" name="Issue">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPicker = ref(false)
const columns = ref(['角色扮演', '动作射击', '模拟经营', '竞速竞技', '策略游戏', '桌面游戏'])
const result = ref('')
const checked = ref('1')
const message = ref('')
const commodityName = ref('')
const number = ref(0)
const onConfirm = (value: string) => {}
const onSubmit = () => {}
const onOversize = () => {}
const onClickLeft = () => {
  router.push('/recommend')
}
const onClickRight = () => {
  //router.push('/recommend')
}
</script>
