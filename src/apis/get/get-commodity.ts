import { getCookie } from '@/utils/Cookie'
import { createDirectus, readItems, rest } from '@directus/sdk'

const client = createDirectus('http://mist-home.top:40066').with(
  rest({
    onRequest: (request: any) => {
      request.headers['Authorization'] = 'Bearer ' + getCookie('directus_session_token')
      request.headers['Access-Control-Allow-Origin'] = '*'
      request.headers['Content-Type'] = 'application/json'
      return request
    }
  })
)

/**
+ * Retrieves commodities by tag based on the current active tab and page.
+ *
+ * @return {Promise<void>} - A promise that resolves when the commodities are retrieved and processed.
+ */
export const getCommoditysByTag = async (
  active: any,
  page: any,
  commoditsTag: any,
  tags: any,
  loading: any,
  refreshing: any,
  finished: any
) => {
  console.log('active', active.value)
  console.log('active', refreshing.value)
  if (
    commoditsTag.value[active.value].length === 0 ||
    commoditsTag.value[active.value].length >= 10
  ) {
    // 推荐页面请求
    if (active.value === 0) {
      await getDefaultCommodity(page, active, commoditsTag, loading, finished)
    } else {
      await client
        .request(
          readItems('commodity_db', {
            fields: ['*', 'imgs.*'],
            page: page.value[active.value] + 1,
            limit: 10,
            filter: {
              _and: [
                {
                  status: {
                    _eq: 'published'
                  }
                },
                {
                  game_classified: {
                    id: {
                      _eq: tags[active.value].id
                    }
                  }
                }
              ]
            }
          })
        )
        .then((res: any) => {
          // 如果请求数据长度小于10，则数据加载完毕
          if (res.length < 10) {
            commoditsTag.value[active.value] = res
            finished.value = true
          } else {
            commoditsTag.value[active.value].push(...res)
          }

          loading.value = false
        })
    }
  }
}

/**
+     * Retrieves the default commodity from the 'commodity_db' table based on the current page and active value.
+     * Logs the default page number to the console.
+     * Fetches the commodities with the status 'published' and tags '推荐' or '官方'.
+     * If the length of commoditsTag is greater than or equal to 10, appends the retrieved commodities to the existing ones.
+     * Otherwise, assigns the retrieved commodities to commoditsTag.
+     * If the length of the retrieved commodities is less than 10, sets finished to true.
+     * Sets loading to false.
+     *
+     * @return {Promise<void>} - A promise that resolves when the default commodity is retrieved and processed.
+     */
export const getDefaultCommodity = async (
  page: any,
  active: any,
  commoditsTag: any,
  loading: any,
  finished: any
) => {
  console.log('default page: ', page.value[active.value] + 1)
  // 获取推荐商品
  await client
    .request(
      readItems('commodity_db', {
        fields: ['*', 'imgs.*'],
        page: page.value[active.value] + 1,
        limit: 10,
        filter: {
          _and: [
            {
              status: {
                _eq: 'published'
              }
            },
            {
              _or: [
                {
                  tag: {
                    _eq: '推荐'
                  }
                },
                {
                  tag: {
                    _eq: '官方'
                  }
                }
              ]
            }
          ]
        }
      })
    )
    .then((res: any) => {
      if (commoditsTag.value[active.value].length >= 10) {
        commoditsTag.value[active.value].push(...res)
      } else {
        commoditsTag.value[active.value] = res
      }
      // const index = tags.findIndex((tag) => tag.name === title)

      // 如果请求数据长度小于10，则数据加载完毕
      if (res.length < 10) {
        finished.value = true
      }
      loading.value = false
    })
}

export const getCommodityById = async (id: any, commodityInId: any) => {
  await client
    .request(
      readItems('commodity_db', {
        fields: ['*', 'imgs.*'],
        filter: {
          id: {
            _eq: id
          }
        }
      })
    )
    .then((res) => {
      Object.assign(commodityInId, res[0])
    })
}

export const getOrderById = async (id: any, order: any) => {
  await client
    .request(
      readItems('order_db', {
        fields: ['*.*'],
        filter: {
          id: {
            _eq: id
          }
        }
      })
    )
    .then((res) => {
      Object.assign(order, res[0])
      console.log(order)
    })
}

export const getGameAccount = async (account: any) => {
  await client
    .request(
      readItems('game_account_db', {
        fields: ['*', 'imgs.*'],
        filter: {
          id: {
            _eq: account
          }
        }
      })
    )
    .then((res) => {
      Object.assign(account, res[0])
    })
}

export const getGameAccountById = async (order_id: any, pageHTML: any) => {
  try {
    const response = await fetch('/pay/ali?order_id=' + order_id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('directus_session_token')
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    const data = await response.json()
    pageHTML.value = data.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

export const getAliPayHTML = async (order_num: any) => {
  try {
    const response = await fetch('/pay/ali?order_id=' + order_num, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }

    const data = await response.text()
    const div = document.createElement('divform')
    div.innerHTML = data // data就是接口返回的form 表单字符串
    document.body.appendChild(div)
    const len = document.forms.length - 1
    document.forms[len].setAttribute('target', '_blank') // 新开窗口跳转
    document.forms[len].submit()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
