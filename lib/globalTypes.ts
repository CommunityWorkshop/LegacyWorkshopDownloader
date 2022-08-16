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
  thumbnail?: string
}

export type GgntwGame = {
  id: string
  name: string
}
