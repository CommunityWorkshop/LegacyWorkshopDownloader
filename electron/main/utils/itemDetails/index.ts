import { ItemDetails } from '../../types'
import { CheckCollection, getCollectionItems } from './CollectionItems'
import getAppId from './getAppId'
import getDescription from './getDescription'
import getImages from './getImages'
import getItemPage from './getItemPage'
import getName from './getName'
import getPostedOn from './getPostedOn'
import getRatingURL from './getRatings'
import getRequiredItems from './getRequiredItems'
import getSizeInBytes from './getSizeInBytes'
import getTags from './getTags'
import getUpdatedOn from './getUpdatedOn'
import { GetVotes } from './getVotes'

export default async function getItemDetails(
  itemId: string,
  details: string[] | 'All' = 'All'
) {
  // * Values
  const page = await getItemPage(itemId)
  let itemDetails: ItemDetails = {
    itemId,
  }

  // * Functions
  const include = (property: string) => {
    return details.includes(property) || details === 'All'
  }

  include('appId') && (itemDetails.appId = getAppId(page))
  include('name') && (itemDetails.name = getName(page))
  include('tags') && (itemDetails.tags = getTags(page))
  include('images') && (itemDetails.images = getImages(page))
  include('description') && (itemDetails.description = getDescription(page))
  include('sizeInBytes') && (itemDetails.sizeInBytes = getSizeInBytes(page))
  include('requiredItems') &&
    (itemDetails.requiredItems = getRequiredItems(page))
  include('collectionItem') &&
    (itemDetails.collectionItem = getCollectionItems(page))
  include('ratings') && (itemDetails.ratings = getRatingURL(page))
  const isCollection = CheckCollection(page)
  include('PostedOn') &&
    (itemDetails.postedOn = getPostedOn(page, isCollection))
  include('UpdatedOn') &&
    (itemDetails.updatedOn = getUpdatedOn(page, isCollection))
  include('votes') && (itemDetails.votes = GetVotes(page))

  return itemDetails
}
