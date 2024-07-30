<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <van-nav-bar
    title="发布商品"
    left-text="返回"
    right-text="保存草稿"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <van-form>
    <van-cell-group inset>
      <van-field
        v-model="describe"
        rows="2"
        autosize
        label="描述："
        type="textarea"
        maxlength="50"
        placeholder="请输入商品描述,50字以内"
        show-word-limit
      />
      <van-field
        v-model="name"
        name="标题"
        label="标题"
        placeholder="商品标题"
        :rules="[{ required: true, message: '请填写商品标题' }]"
      />
      <van-field
        v-model="tag_1"
        name="关键词标签 1"
        label="关键词标签 1"
        placeholder="点击输入关键词标签 1"
      />
      <van-field
        v-model="tag_2"
        name="关键词标签 2"
        label="关键词标签 2"
        placeholder="点击输入关键词标签 2"
      />
      <van-field
        v-model="result"
        is-link
        readonly
        name="game_classified"
        label="游戏分类"
        placeholder="点击选择游戏分类"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
      <van-field
        v-model="result"
        is-link
        readonly
        name="game_classified"
        label="游戏账号"
        placeholder="点击选择游戏账号"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>
      <van-field
        v-model="number"
        type="number"
        label="售价(元)"
        placeholder="请输入售价"
        :rules="[{ required: true, message: '请填写售价' }]"
      />
      <div style="display: flex; justify-content: center">
        <van-uploader
          v-model="imgs"
          multiple
          :max-size="3000 * 1024"
          @oversize="onOversize"
          :max-count="3"
          accept="image/jpg,image/jpeg,image/png"
          upload-text="上传图片"
          :after-read="afterRead"
        />
      </div>

      <van-field name="radio" label="是否加速出售">
        <template #input>
          <van-radio-group v-model="promotion" direction="horizontal">
            <van-radio name="1">是</van-radio>
            <van-radio name="2">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-submit-bar
        :loading
        :price="price"
        button-text="发布商品"
        native-type="submit"
        label="预计收入"
        @submit="onSubmit"
      />
    </div>
  </van-form>
</template>
<script setup lang="ts" name="Issue">
import { getGameOptions } from '@/apis/get/get-sys'
import { addToCommodityDB, uploadCommodityImg } from '@/apis/post/add-commodity'
import type { column } from '@/types/page'
import type { SelectedOptions } from '@/types/page'
import { showDialog } from 'vant'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPicker = ref<boolean>(false)
const columns = reactive<column[]>([])
const result = ref('')
const promotion = ref<string>('2')
const name = ref<string>('')
const number = ref<number>()
const loading = ref<boolean>(false)
const price = ref<number>(0)
const tag_1 = ref<string>('')
const tag_2 = ref<string>('')
const describe = ref<string>('')
const imgs = reactive<any[]>([])
const imgsResult = reactive<{ directus_files_id: string }[]>([])

onMounted(() => {
  getGameOptions(columns)
})

watch(number, () => {
  calculatedIncome()
})

const calculatedIncome = () => {
  if (number.value === undefined) {
    return 0
  }
  price.value = number.value * 97
}

const onConfirm = ({ selectedOptions }: { selectedOptions: SelectedOptions[] }): void => {
  result.value = selectedOptions[0]?.text
  showPicker.value = false
}

const afterRead = (file: any) => {
  file.status = 'uploading'
  file.message = '上传中...'

  setTimeout(async () => {
    try {
      await uploadCommodityImg(file.file, imgsResult)
      console.log('imgsResult: ' + imgsResult)
      imgs.push({
        url: 'http://localhost/assets/' + imgsResult[imgsResult.length - 1].directus_files_id,
        isImage: true
      })
      file.status = 'success'
      file.message = '上传成功'
    } catch (e) {
      console.log(e)
      file.status = 'failed'
      file.message = '上传失败'
    }
  }, 1000)
}

const onSubmit = async () => {
  if (name.value === '' || number.value === undefined || price.value === 0) {
    showDialog({ message: '请检查并填写必填项' })
    return
  }
  if (result.value === '') {
    showDialog({ message: '请选择游戏分类' })
    return
  }
  const commodity = {
    name: name.value,
    price: number.value,
    describe: describe.value,
    tag_1: tag_1.value,
    tag_2: tag_2.value,
    status: 'published',
    imgs: imgsResult, // TODO: 改格式
    game_classified:
      columns[columns.findIndex((item: { text: string }) => item.text === result.value)].value,
    promotion: promotion.value
  }
  await addToCommodityDB(commodity)
}
const onOversize = () => {
  showDialog({ message: '图片不能超过3M' })
}
const onClickLeft = () => {
  router.push('/recommend')
}
const onClickRight = () => {
  router.push('/recommend')
}
</script>
