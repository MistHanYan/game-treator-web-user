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
  img: string
  game_classified: any
  tag_1: string
  tag_2: string
}

export interface img {
  id: number
  directus_files_id: string
  commodity_db_id: number
}
