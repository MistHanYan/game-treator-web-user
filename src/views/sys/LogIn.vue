<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div>
    <div>
      <div class="logo-container">
        <img :src="logo" alt="" />
      </div>
    </div>
    <div>
      <van-form label-width="0" @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="formState.username"
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
            <van-button round size="large" type="primary" @click="onSubmit(formState)">
              登录
            </van-button>
          </div>
          <div :span="20">
            <van-button round size="large" type="default" @click="signIn"> 注册 </van-button>
          </div>
        </div>
      </van-form>
    </div>

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
  </div>
</template>

<script setup lang="ts" name="App">
import { reactive } from 'vue'
//import { validEmail } from '@/utils/validate.js'
import { useRouter } from 'vue-router'
import { showFailToast } from 'vant'
import logo from '@/assets/imgs/logo.jpg'
import { createDirectus, rest, authentication } from '@directus/sdk'
import { setCookie } from '@/utils/Cookie'
import { useUserStore } from '@/stores/useUserStore'

const router = useRouter()

const formState = reactive({
  username: '',
  password: ''
})

const useInfo = useUserStore()

const onSubmit = async (values: any) => {
  try {
    const client = createDirectus('http://mist-home.top:40066')
      .with(authentication('json'))
      .with(
        rest({
          onRequest: (request: any) => {
            request.headers['Access-Control-Allow-Origin'] = '*'
            request.headers['Host'] = 'mist-home.top:40066'
            request.headers['Content-Type'] = 'application/json'
            return request
          }
        })
      )

    // login http request
    await client.login(values.username, values.password).then((res: any) => {
      setCookie('directus_session_token', res.access_token, 7)
      setCookie('refresh_token', res.refresh_token, 7)
    })
    //const { token } = data
    await useInfo.updateUser()
    await router.push('/recommend')
  } catch (e) {
    showFailToast('登录失败，请检查账号或密码')
  }
}

const signIn = () => {
  router.push('/sign-in')
}
</script>

<style lang="scss" scoped>
.logo-container {
  text-align: center;
  width: 82px;
  height: 82px;
  border-radius: 50%;
  margin: 60px auto 40px;
  overflow: hidden;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
