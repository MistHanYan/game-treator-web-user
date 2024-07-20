<template>
  <login-layout>
    <template #body>
      <van-form label-width="0" @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="formState.username"
            :rules="rules.username"
            name="username"
            label=""
            placeholder="用户名"
            maxlength="30"
            clearable
          />
          <van-field
            v-model="formState.password"
            type="password"
            name="password"
            label=""
            placeholder="密码"
            clearable
            :rules="rules.password"
          />
        </van-cell-group>
        <div
          :span="24"
          style="
            height: 15vh;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: stretch;
            align-content: space-around;
          "
        >
          <div :span="20">
            <van-button round size="large" type="primary" @click="onSubmit(formState)"> 登录 </van-button>
          </div>
          <div :span="20">
            <van-button round size="large" type="default"> 注册 </van-button>
          </div>
        </div>
      </van-form>
    </template>

    <!-- <template #foot>
      <div>
        <div>
          <van-button @click="router.push('/forgot')"
            >忘记密码</van-button
          >
          <van-button @click="router.push('/register')">注册账号</van-button
          >
        </div>
      </div>
    </template> -->
  </login-layout>
</template>

<script setup lang="ts" name="App">
import { reactive, onMounted } from 'vue'
import {validEmail, validPhone} from '@/utils/validate.js'
import { LoginLayout } from '@/components/YuLayout'
import { useRouter } from 'vue-router'
import { showFailToast } from 'vant'
import {createDirectus, rest, authentication, login} from '@directus/sdk';

const router = useRouter()

const trigger = 'onBlur' // onChange

const formState = reactive({
  username: '',
  password: ''
})

const checkUserName = (value, rule) => {
  if (!value) return '请填写手机号码！'
  if (!validEmail(value)) return '手机号格式不正确！'
  return true
}

const rules = {
  username: [
    { required: true, message: '请填写用户名', trigger },
    { validator: checkUserName, trigger }
  ],
  password: [{ required: true, message: '密码不能为空', trigger }]
}

const onSubmit = async (values: any) => {
  try {
    console.log(values)
    const client = createDirectus('http://localhost').with(authentication('json')).with(rest());

// login http request
    const result = await client.login(values.email, values.password);
    //const { token } = data
      await router.push('/home')
  } catch (e) {
    showFailToast('登录失败，请稍后再试...')
  } finally {
    console.log('dew')
  }
}
</script>
