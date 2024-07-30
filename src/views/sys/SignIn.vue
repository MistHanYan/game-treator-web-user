<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div>
    <div>
      <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div>
      <div>
        <div class="logo-container">
          <h3>注册启帆交易所账号</h3>
        </div>
      </div>
      <div>
        <van-form @failed="onFailed">
          <van-cell-group inset>
            <van-field
              v-model="signInForm.email"
              name="validatorEmail"
              label="邮箱"
              placeholder="点击输入邮箱"
              label-width="4em"
              :rules="[{ validator: emailCheck(), required: true, message: '请填写邮箱' }]"
            />
            <van-field
              v-model="signInForm.nickname"
              label="昵称"
              name="nickname"
              placeholder="不要太离谱就行"
              label-width="4em"
              :rules="[{ required: true, message: '请填写昵称' }]"
            />
            <van-field
              v-model="signInForm.password"
              type="password"
              name="password"
              label="密码"
              placeholder="首次输入密码"
              label-width="4em"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
              v-model="signInForm.checkPassword"
              type="password"
              name="validatorPassword"
              label="确认密码"
              label-width="4em"
              placeholder="重复上述密码"
              :rules="[{ validator: passwordCheck(), required: true, message: '请填写密码' }]"
            />
          </van-cell-group>
          <van-field name="agreement">
            <div>
              <van-checkbox v-model="signInForm.agreement" shape="square">
                <a href="#"> 我已阅读并同意 </a>
              </van-checkbox>
            </div>
          </van-field>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit" @click="onSubmit">
              注册
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="SignIn">
import { reactive } from 'vue'
//import { areaList } from '@vant/area-data'
import { showConfirmDialog, showDialog } from 'vant'
import { createDirectus, registerUser, rest } from '@directus/sdk'
import router from '@/router'

interface signInFormCheck {
  nickname: string
  password: string
  email: string
  phone: string
  checkPassword: string
  sex: string
  date: string
  area: string
  agreement: boolean
}

const signInForm = reactive<signInFormCheck>({
  nickname: '',
  password: '',
  email: '',
  phone: '',
  checkPassword: '',
  sex: '',
  date: '',
  area: '',
  agreement: false
})

const onClickLeft = () => history.back()

/**
 * Checks if the password in the signInForm matches the check password field.
 *
 * @return {string} Returns an error message if the passwords do not match.
 */
const passwordCheck = (): any | undefined => {
  if (signInForm.checkPassword != signInForm.password) {
    return '两次密码不一致'
  }
}

/**
 * Checks if the email in the signInForm is valid.
 *
 * @return {boolean} Returns true if the email is valid, false otherwise.
 */
const emailCheck = (): any | undefined => {
  if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(signInForm.email) != true) {
    return '${val} 不合法，请重新输入'
  }
}
/**
 * Logs the error information when the sign-in process fails.
 *
 * @param {Object} errorInfo - The information about the error that occurred.
 * @return {void} This function does not return anything.
 */
const onFailed = (errorInfo: any) => {
  console.log('failed', errorInfo)
}

/**
 * Asynchronous function that handles form submission for user registration.
 * Validates the agreement field, prompts the user to confirm if the agreement is not accepted,
 * registers the user using Directus API, and displays a success message upon successful registration.
 * If an error occurs during any step, it is logged to the console.
 */
async function onSubmit() {
  try {
    if (!signInForm.agreement) {
      await showConfirmDialog({
        title: '标题',
        message: '请先阅读并同意协议'
      })
        .then(() => {
          // on confirm
          signInForm.agreement = true
          throw new Error('重新提交')
        })
        .catch(() => {
          // on cancel
          throw new Error('未阅读并同意协议')
        })
    }
    const client = createDirectus('http://localhost').with(rest())
    await client.request(
      registerUser(signInForm.email, signInForm.password, {
        last_name: signInForm.nickname
      })
    )
    await showDialog({
      title: '注册成功',
      message: '账号注册成功，快进入交易所吧'
    }).then(() => {
      router.push('/login')
    })
  } catch (e) {
    console.log(e)
  }
}
</script>

<style lang="css" scoped>
.logo-container {
  text-align: center;
  width: 100%;
  border-radius: 50%;
  margin: 0px auto 0px;
}
.avatar {
  text-align: center;
  width: 100%;
  height: 82px;
  border-radius: 50%;
  margin: 0px auto 0px;
  overflow: hidden;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
<style>
.van-field__control--custom {
  display: flex;
  align-items: center;
  min-height: var(--van-cell-line-height);
  flex-direction: column;
  overflow: hidden;
}
</style>
