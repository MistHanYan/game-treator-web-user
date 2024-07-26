<template>
  <login-layout>
    <template #header>
      <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="onClickLeft" />
    </template>
    <template #body>
      <div>
        <div class="logo-container">
          <h3>注册启帆交易所账号</h3>
        </div>
        <!-- <div class="logo-container">
          <van-field name="uploader">
            <template #input>
              <van-uploader
                :after-read="afterRead"
                multiple
                :max-count="1"
                :max-size="500 * 1024"
                @oversize="onOversize"
              />
            </template>
            <label for="uploader" style="font-size: 15px">上传头像(图片大小不能超过3MB)</label>
          </van-field>
        </div> -->
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
              :rules="[{ validator: emailCheck, required: true, message: '请填写邮箱' }]"
            />
            <!-- <van-field
              v-model="signInForm.phone"
              name="validatorPhone"
              label="手机"
              placeholder="没有校验，尽量填真的，方便客服联系"
              label-width="4em"
              :rules="[{ validator: phoneCheck, required: true, message: '请填写手机号' }]"
            /> -->
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
              :rules="[{ validator: passwordCheck, required: true, message: '请填写密码' }]"
            />
            <!-- <van-field
              name="sex"
              label="性别"
              :rules="[{ validator: sexCheck, required: true, message: '请选择性别' }]"
              label-width="4em"
            >
              <template #input>
                <van-radio-group v-model="signInForm.sex" direction="horizontal">
                  <van-radio name="man">男</van-radio>
                  <van-radio name="woman">女</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              v-model="signInForm.date"
              is-link
              readonly
              name="datePicker"
              label="生日"
              label-width="4em"
              placeholder="点击选择日期"
              @click="showPicker = true"
            />
            <van-popup v-model:show="showPicker" position="bottom">
              <van-date-picker @confirm="onConfirmDate" @cancel="showPicker = false" />
            </van-popup>
            <van-field
              v-model="signInForm.area"
              is-link
              readonly
              name="area"
              label="地区选择"
              label-width="4em"
              placeholder="点击选择省市区"
              @click="showArea = true"
            />
            <van-popup v-model:show="showArea" position="bottom">
              <van-area :area-list="areaList" @confirm="onConfirmArea" @cancel="showArea = false" />
            </van-popup>-->
          </van-cell-group>
          <van-field name="agreement">
            <template #input>
              <van-checkbox v-model="signInForm.agreement" shape="square">
                <a href="#"> 我已阅读并同意 </a>
              </van-checkbox>
            </template>
          </van-field>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit" @click="onSubmit">
              注册
            </van-button>
          </div>
        </van-form>
      </div>
    </template>
  </login-layout>
</template>
<script setup lang="ts" name="SignIn">
import { LoginLayout } from '@/components/YuLayout'
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
const passwordCheck = () => {
  if (signInForm.checkPassword != signInForm.password) {
    return '两次密码不一致'
  }
}

// const sexCheck = () => {
//   if (signInForm.sex == '') {
//     return '请选择性别'
//   }
// }
/**
 * Checks if the phone number in the signInForm is valid.
 *
 * @return {boolean} Returns true if the phone number is valid, false otherwise.
 */
// const phoneCheck = () => {
//   if (/^1[3456789]\d{9}$/.test(signInForm.phone) != true) {
//     return '${val} 不合法，请重新输入'
//   }
// }
/**
 * Checks if the email in the signInForm is valid.
 *
 * @return {boolean} Returns true if the email is valid, false otherwise.
 */
const emailCheck = () => {
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
const onFailed = (errorInfo) => {
  console.log('failed', errorInfo)
}

// const onOversize = (file: File) => {
//   if (file.size > 1024 * 1024 * 3) {
//     showDialog({
//       title: '图片大小超过限制',
//       message: '头像上传的图片大小必须小于3MB',
//       theme: 'round-button'
//     }).then(() => {
//       // on close
//     })
//   }
// }

// const showArea = ref(false)

/**
 * Updates the area in the signInForm based on the selected options.
 *
 * @param {Object} selectedOptions - The selected options from the area picker.
 * @return {void} This function does not return anything.
 */
// const onConfirmArea = ({ selectedOptions }) => {
//   showArea.value = false
//   signInForm.area = selectedOptions.map((item) => item.text).join('/')
// }
// const showPicker = ref(false)

/**
 * Updates the signInForm.date property with the selected date values, and hides the date picker.
 *
 * @param {Object} selectedValues - An object containing the selected date values.
 * @return {void}
 */
// const onConfirmDate = ({ selectedValues }) => {
//   signInForm.date = selectedValues.join('/')
//   showPicker.value = false
// }
// const afterRead = (file) => {
//   // 此时可以自行将文件上传至服务器
//   console.log('ok')
// }

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
