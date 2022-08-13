declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    readonly VITE_DEV_SERVER_HOST: string
    readonly VITE_DEV_SERVER_PORT: string
  }
}

declare module 'axios/dist/axios'

type ItemDetails = {
  appId?: string
  tags?: string[]
  name?: string
  images?: string[]
  description?: string
  itemId: string
  sizeInBytes?: number
  requiredItems?: string[]
  postedOn?: number //Unix
  updatedOn?: number //Unix,
  votes?: number
  ratings?: number
  collectionItem?: string[]
  thumbnail?: string
}
