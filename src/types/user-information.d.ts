export interface user_information {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
  location: string | null
  title: string | null
  description: string | null
  tags: string[] | null
  avatar: string | null
  language: string | null
  tfa_secret: string | null
  status: string
  role: string
  token: string | null
  last_access: string
  last_page: string
  provider: string
  external_identifier: string | null
  auth_data: string | null
  email_notifications: boolean
  appearance: string | null
  theme_dark: string | null
  theme_light: string | null
  theme_light_overrides: string | null
  theme_dark_overrides: string | null
}

export interface GameAccount {
  id: number
  status: string
  sort: any // 这里根据实际情况定义排序属性的类型
  user_created: string // 这里假设用户创建者是一个字符串，根据实际情况定义
  date_created: string
  account: string
  passwd: string
}
