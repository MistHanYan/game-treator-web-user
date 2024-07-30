import { createDirectus, readItems, rest } from '@directus/sdk'

const client = createDirectus('http://localhost').with(rest())
/**
+ * Retrieves the latest announcement from the server and displays it in a modal.
+ *
+ * @return {Promise<void>} A promise that resolves when the announcement is retrieved and displayed.
+ */
export const getAnnouncement = async (announcementContent: any) => {
  await client
    .request(
      readItems('announcement_db', {
        limit: 1
      })
    )
    .then((res: any) => {
      Object.assign(announcementContent, res[0]) // res
    })
}

/**
  + * Retrieves the pop-up advertisement from the server.
  + *
  + * @return {Promise<void>} A promise that resolves when the advertisement is retrieved.
  + */
export const getPopUpAd = async (popUpAd: any) => {
  await client.request(readItems('advertising', {})).then((res: any) => {
    if (res.length > 0) {
      Object.assign(popUpAd, res[0])
    }
    //images.push(...res)
  })
}

/**
+ * Retrieves tags from the 'game_db' table based on the 'status' field.
+ * Initializes the 'commoditsTag' array with empty arrays for each tag.
+ * Initializes the 'loading' array to false.
+ * Initializes the 'page' array with zeros for each tag.
+ *
+ * @return {Promise<void>} - A promise that resolves when the tags are retrieved and processed.
+ */
export const getTags = async (tags: any, commoditsTag: any, loading: any, page: any) => {
  await client
    .request(
      readItems('game_db', {
        filter: {
          status: {
            _eq: 'published'
          }
        }
      })
    )
    .then((res: any) => {
      tags.push(...res)
      commoditsTag.value = tags.map(() => []) // 初始化 commoditsTag 数组
      loading.value = false // 初始化 loading 数组
      page.value = tags.map(() => 0)
    })
}

export const getSlideshow = async (slideshowImages: any) => {
  await client
    .request(
      readItems('slideshow_db', {
        filter: {
          status: {
            _eq: 'published'
          }
        }
      })
    )
    .then((res: any) => {
      slideshowImages.push(...res)
    })
}

export const getGameOptions = async (gameOptions: any) => {
  if (gameOptions.length != 0) {
    return
  }
  await client
    .request(
      readItems('game_db', {
        filter: {
          status: {
            _eq: 'published'
          }
        }
      })
    )
    .then((res: Array<any>) => {
      for (let i = 0; i < res.length; i++) {
        const item = {
          text: res[i].name,
          value: res[i].id
        }
        gameOptions.push(item)
      }
    })
    .catch((err: any) => {
      console.log(err)
    })
}
