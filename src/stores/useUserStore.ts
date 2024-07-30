import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { user_information } from '@/types/user-information'
import { createDirectus, readMe, rest } from '@directus/sdk'

export const useUserStore = defineStore('user_information', () => {
  const user_account = reactive<user_information>({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    location: '',
    title: '',
    description: '',
    tags: [],
    avatar: '',
    language: '',
    tfa_secret: '',
    status: '',
    role: '',
    token: '',
    last_access: '',
    last_page: '',
    provider: '',
    external_identifier: '',
    auth_data: '',
    email_notifications: false,
    appearance: '',
    theme_dark: '',
    theme_light: '',
    theme_light_overrides: '',
    theme_dark_overrides: ''
  })

  async function updateUser() {
    const client = createDirectus('http://localhost').with(rest())
    await client
      .request(
        readMe({
          fields: ['*.*']
        })
      )
      .then((res: any) => {
        Object.assign(user_account, res)
      })
  }
  return {
    user_account,
    updateUser
  }
})
