import { validateAndGetId } from '@/utils/validateAndGetId'
import { Image32Regular } from '@fluentui/react-icons'
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

  const imageURl = itemData?.thumbnail ?? itemData?.images?.[0]

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
    // Show preview if item name and size found otherwise show nothing
    if (data.name && data.sizeInBytes) {
      console.log(data)
      setItemData(data)
    } else {
      setItemId(undefined)
    }
    setLoading(false)
  }

  const openItemInBrowser = () => {
    ipcRenderer.invoke('openLink', itemURL)
  }

  if (itemId) {
    return (
      <div className="mt-4 flex flex-col gap-4 items-center justify-center">
        <div className="border-t-2 border-white w-36 border-opacity-5" />
        <div className="py-5 bg-white bg-opacity-5 px-5 rounded-lg">
          {loading && <Loading />}

          {!loading && itemData && (
            <div className="flex flex-row items-center justify-center">
              <button
                className="hover:opacity-75 bg-opacity-5 rounded-md bg-white w-24 h-24 transition-all"
                onClick={openItemInBrowser}
              >
                {imageURl ? (
                  <img
                    className="w-full h-full"
                    src={imageURl}
                    alt={itemData.name}
                  />
                ) : (
                  <Image32Regular color="white" fontSize={40} />
                )}
              </button>

              <div className="flex flex-col ml-4">
                <h3
                  className="text-white max-w-xs overflow-hidden text-sm whitespace-nowrap text-ellipsis
            text-opacity-70"
                >
                  {itemData?.name}
                </h3>
                {/* File size */}
                <h3 className="text-white mt-1 font-medium text-sm ">
                  {itemData.sizeInBytes &&
                    bytes(itemData.sizeInBytes, { unitSeparator: ' ' })}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  } else {
    return <></>
  }
}

export default Preview
