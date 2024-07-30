import router from '@/router'
import { getCookie } from '@/utils/Cookie'
import { createDirectus, createItems, rest, uploadFiles } from '@directus/sdk'
import { showDialog } from 'vant'

const client = createDirectus('http://localhost').with(rest())

export const addToCommodityDB = async (commodity: any) => {
  await client
    .request(createItems('commodity_db', commodity))
    .then(() => {
      showDialog({
        message: '发布成功'
      })
    })
    .catch((err) => {
      console.log(err)
      showDialog({
        message: '发布失败，请检查网络连接'
      })
    })
}

export const uploadCommodityImg = async (img: any, imgsResult: any) => {
  const formData = new FormData()
  formData.append('folder', 'c8da06ba-0397-4666-aeba-da2462bba123')
  formData.append('commodity_img', img)
  await client.request(uploadFiles(formData)).then((res) => {
    imgsResult.push({ directus_files_id: res.id })
  })
}

export const getGeneratedOrder = async (commodity_id: any, receiving_account_id: any) => {
  try {
    const response = await fetch(
      '/order/generate?commodity_id=' +
        commodity_id +
        '&receiving_account_id=' +
        receiving_account_id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('directus_session_token')
        }
      }
    )

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    const data = await response.json()
    await router.push({
      name: 'order',
      query: {
        order_id: data.data.id
      }
    })
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
