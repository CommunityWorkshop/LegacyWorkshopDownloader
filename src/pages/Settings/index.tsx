import IconButton from '@/components/IconButton'
import useAutoExtract from '@/hooks/useAutoExtract'
import useDownloadLocation from '@/hooks/useDownloadLocation'
import { ipcRenderer } from 'electron'

const Settings = () => {
  // * Hooks
  const { downloadLocation, selectFolder } = useDownloadLocation()
  const { autoExtractEnabled, changeAutoExtract } = useAutoExtract()

  // * Functions
  const handleOpenDownloadFolder = () => {
    ipcRenderer.invoke('openDownloadFolder')
  }

  return (
    <div className="sm:max-w-lg flex-col lg:max-w-2xl xl:max-w-4xl self-center py-5 flex w-full">
      <div className="flex flex-col flex-1">
        <h3 className="text-white">Download location</h3>
        <div className="w-full flex mt-2 flex-row items-center justify-center">
          <button
            onClick={selectFolder}
            className="bg-white hover:bg-opacity-10 transition-all w-full flex items-start rounded-md bg-opacity-5 py-2 px-5"
          >
            <h1 className="text-white font-light">{downloadLocation}</h1>
          </button>
          <IconButton
            className="ml-2"
            icon={'fluent:open-16-regular'}
            onClick={handleOpenDownloadFolder}
          />
        </div>
      </div>
      <div className="w-full mt-5">
        <div className="form-check">
          <label
            htmlFor="default-toggle"
            className="inline-flex mt-1 relative items-center cursor-pointer"
          >
            <input
              onChange={(e) => changeAutoExtract(e.target.checked)}
              type="checkbox"
              checked={autoExtractEnabled}
              id="default-toggle"
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-primary-light peer-focus:outline-none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            <span className="ml-3 font-medium text-white">Auto Extract</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Settings
