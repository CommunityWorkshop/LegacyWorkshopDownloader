import { validateAndGetId } from '@/utils/validateAndGetId'
import bytes from 'bytes'
import { ipcRenderer } from 'electron'
import { useEffect, useState } from 'react'
import Loading from '../Loading'

interface Props {
  itemURL: string
}

const Preview = ({ itemURL }: Props) => {
  const [itemId, setItemId] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const [itemData, setItemData] = useState<ItemDetails>()

  useEffect(() => {
    getItemId(itemURL)
  }, [itemURL])

  useEffect(() => {
    if (itemId) {
      getItemData()
    } else {
      setItemData(undefined)
    }
  }, [itemId])

  // * Functions
  const getItemId = async (url: string) => {
    try {
      const itemIdLocal = validateAndGetId(url)
      setItemId(itemIdLocal)
    } catch (error) {
      console.log(error)
      setItemId(undefined)
    }
  }

  const getItemData = async () => {
    setLoading(true)
    const data = await ipcRenderer.invoke('getItemData', itemId)
    console.log(data)
    setItemData(data)
    setLoading(false)
  }
  if (itemId) {
    return (
      <div className="py-5 bg-white bg-opacity-5 mt-8 px-5 rounded-lg">
        {loading && <Loading />}

        {!loading && itemData && (
          <div className="flex flex-row items-center justify-center">
            <img
              className="w-24 h-24 rounded-md"
              src={itemData.thumbnail}
              alt={itemData.name}
            />
            <div className="flex flex-col overflow-hidden ml-4 max-w-xs">
              <h3 className="text-white text-sm text-ellipsis whitespace-nowrap text-opacity-70">
                {itemData?.name}
              </h3>
              <h3 className="text-white mt-1 font-medium text-sm ">
                {bytes(itemData?.sizeInBytes, { unitSeparator: ' ' })}
              </h3>
            </div>
          </div>
        )}
      </div>
    )
  } else {
    return <></>
  }
}

export default Preview
