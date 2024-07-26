import router from '@/router'
import { createDirectus, createItems, rest, uploadFiles } from '@directus/sdk'
import { showDialog } from 'vant'

const client = createDirectus('http://localhost').with(rest())

export const addToCommodityDB = (commodity: any) => {
  client
    .request(createItems('commodity_db', commodity))
    .then(() => {
      router.push('/recommend')
      showDialog({
        message: '发布成功',
      })
      return true
    })
    .catch((err) => {
      console.log(err)
      showDialog({
        message: '发布失败，请检查网络连接',
      })
      return false
    })
}

export const uploadCommodityImg = async (img: any, imgsResult: any) => {
  const formData = new FormData()
  formData.append('folder', 'c8da06ba-0397-4666-aeba-da2462bba123')
  formData.append('commodity_img', img)
  await client.request(uploadFiles(formData)).then((res) => {
    imgsResult.push({directus_files_id: res.id})
  })
}
