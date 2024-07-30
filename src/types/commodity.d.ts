import type { GameAccount, user_information } from './user-information'

export interface commodity {
  id: number
  name: string
  price: number
  describe: string
  tag: string
  status: string
  user_create: string
  date_create: string
  imgs: Array<img>
  game_classified: any
  tag_1: string
  tag_2: string
  user_account: number
  promotion: string
}

export interface img {
  id: number
  directus_files_id: string
  commodity_db_id: number
}

export interface Order {
  id: number
  status: string
  sort: string | null
  date_created: string
  date_updated: string | null
  date_end: string | null
  price: number
  order_num: string
  user_created: user_information | null
  user_updated: user_information | null
  commodity_id: commodity | null
  receiving_account_id: GameAccount | null
  customer_id: user_information | null
}
