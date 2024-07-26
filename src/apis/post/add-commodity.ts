import { createDirectus, createItems, rest, uploadFiles } from '@directus/sdk'

const client = createDirectus('http://localhost').with(rest())

export const addToCommodityDB = (commodity: any) => {
  console.log(commodity)
  client
    .request(createItems('commodity_db', commodity))
    .then((res) => {
      console.log(res)
      return true
    })
    .catch((err) => {
      console.log(err)
      return false
    })
}

export const uploadCommodityImg = async (img: any, imgsResult: any) => {
  const formData = new FormData()
  formData.append('folder', 'c8da06ba-0397-4666-aeba-da2462bba123')
  formData.append('commodity_img', img)
  await client.request(uploadFiles(formData)).then((res) => {
    imgsResult.push(res)
  })
}
