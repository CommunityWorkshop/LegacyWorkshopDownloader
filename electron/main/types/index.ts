import { HTMLElement as HTMLElementType } from 'node-html-parser'

export type ItemDetails = {
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
}

export type HTMLPage = HTMLElementType
