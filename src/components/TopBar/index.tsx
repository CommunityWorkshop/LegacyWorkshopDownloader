import { currentPageAtom } from '@/atoms/CurrentPageAtom'
import {
  ArrowMinimize16Regular,
  Dismiss12Regular,
  Home24Regular,
  Settings24Regular,
} from '@fluentui/react-icons'
import { ipcRenderer } from 'electron'
import { useRecoilState } from 'recoil'
import NavigationItem from './NavigationItem'

const TopBar = () => {
  // * Atoms
  const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom)

  // * Effects

  // * Functions
  const handleClose = () => {
    ipcRenderer.invoke('close')
  }

  const handleMinimize = () => {
    ipcRenderer.invoke('minimize')
  }

  return (
    <div className="flex drag flex-row border-b-2 border-b-black">
      {/* Workshop logo */}
      <div className="flex flex-row z-10">
        <div className="flex flex-row  items-center p-1 px-3 bg-primary-dark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="30"
            height="30"
            color="#fff"
            className="mr-1"
            fill="currentColor"
          >
            <path d="M9.4511719 6 A 1.50015 1.50015 0 0 0 8.4394531 6.4394531L6.4394531 8.4394531 A 1.50015 1.50015 0 0 0 6.234375 10.306641L10.087891 16.355469C11.171478 18.08889 13.518545 18.411728 15.111328 17.232422L22.925781 25.046875C21.589425 27.348821 21.794269 30.320933 23.748047 32.296875L23.746094 32.296875L31.660156 40.318359 A 1.50015 1.50015 0 0 0 31.664062 40.320312C34.00416 42.677607 37.855811 42.691448 40.212891 40.351562C42.568383 38.013264 42.585508 34.161053 40.248047 31.804688L40.244141 31.800781L32.345703 23.794922 A 1.50015 1.50015 0 0 0 32.34375 23.794922C30.373634 21.803489 27.371608 21.58035 25.048828 22.927734L17.232422 15.111328C18.409993 13.519538 18.089252 11.174656 16.359375 10.089844L10.306641 6.234375 A 1.50015 1.50015 0 0 0 9.4511719 6 z M 31.414062 6C25.796062 6 21.207453 10.438234 20.939453 15.990234L24.138672 19.1875C24.218672 18.9265 24.231156 18.646047 24.160156 18.373047C23.996156 17.736047 23.914062 17.106 23.914062 16.5C23.914062 12.364 27.278063 9 31.414062 9C31.797062 9 32.176781 9.0298906 32.550781 9.0878906L29.318359 12.318359C28.467359 13.168359 28 14.298 28 15.5C28 16.702 28.468359 17.831641 29.318359 18.681641C30.168359 19.531641 31.298 20 32.5 20C33.702 20 34.831641 19.531641 35.681641 18.681641L38.849609 15.515625C38.893609 15.840625 38.914062 16.169 38.914062 16.5C38.914062 19.479 37.166578 22.071344 34.642578 23.277344L36.828125 25.490234C39.873125 23.650234 41.914062 20.308047 41.914062 16.498047C41.914062 14.955047 41.578063 13.458875 40.914062 12.046875C40.706063 11.604875 40.296453 11.289078 39.814453 11.205078C39.335453 11.121078 38.841094 11.278047 38.496094 11.623047L33.560547 16.558594C32.994547 17.124594 32.005453 17.125594 31.439453 16.558594C31.156453 16.276594 31 15.9 31 15.5C31 15.1 31.156453 14.723453 31.439453 14.439453L36.404297 9.4726562C36.747297 9.1296563 36.904219 8.6430625 36.824219 8.1640625C36.744219 7.6860625 36.436953 7.2755 36.001953 7.0625C34.551953 6.3575 33.009062 6 31.414062 6 z M 9.7089844 9.4121094L14.753906 12.625 A 1.50015 1.50015 0 0 0 14.765625 12.630859C15.06549 12.818206 15.104028 13.157691 14.853516 13.408203L13.408203 14.853516C13.156866 15.105129 12.819986 15.068171 12.630859 14.765625 A 1.50015 1.50015 0 0 0 12.625 14.753906L9.4121094 9.7089844L9.7089844 9.4121094 z M 17.212891 22.162109L7.7558594 31.693359C6.6178594 32.839359 5.994 34.361562 6 35.976562C6.006 37.591563 6.6411562 39.107141 7.7851562 40.244141C8.9261563 41.377141 10.436922 42 12.044922 42L12.066406 42C13.681406 41.994 15.197938 41.359891 16.335938 40.212891L22.552734 33.945312L22.203125 33.59375C21.590125 32.97375 21.109281 32.267625 20.738281 31.515625L14.207031 38.099609C13.634031 38.676609 12.869641 38.997 12.056641 39C11.204641 38.986 10.477391 38.689234 9.9003906 38.115234C9.3223906 37.542234 9.003 36.778844 9 35.964844C8.997 35.151844 9.3117656 34.385594 9.8847656 33.808594L19.333984 24.283203L17.212891 22.162109 z M 28.058594 24.990234C28.835631 24.993734 29.612259 25.299186 30.210938 25.904297L38.111328 33.912109 A 1.50015 1.50015 0 0 0 38.115234 33.916016C39.311788 35.12001 39.304792 37.026276 38.099609 38.222656C36.892689 39.420772 34.990872 39.413742 33.792969 38.207031L25.880859 30.189453 A 1.50015 1.50015 0 0 0 25.880859 30.1875C24.687081 28.980179 24.696265 27.080094 25.900391 25.884766C26.504476 25.285082 27.281557 24.98673 28.058594 24.990234 z" />
          </svg>
          <h3 className="text-white text-lg">WorkShop</h3>
        </div>
        <div className="triangle"></div>
      </div>
      {/* navigation area */}
      <div
        style={{
          marginLeft: -75,
        }}
        className="flex-1  flex flex-row w-full pl-10 bg-primary-default"
      >
        <NavigationItem
          isSelected={currentPage === 'home'}
          onClick={() => {
            setCurrentPage('home')
          }}
          name="Home"
          Icon={<Home24Regular className="text-white" />}
        />
        <NavigationItem
          isSelected={currentPage === 'settings'}
          onClick={() => {
            setCurrentPage('settings')
          }}
          name="Settings"
          Icon={<Settings24Regular className="text-white" />}
        />
      </div>
      {/* window actions */}
      <div className="flex flex-1 bg-primary-default justify-end">
        <div className="flex mr-5 gap-2 items-center justify-center h-full ">
          <button
            onClick={handleMinimize}
            className="bg-white nodrag border-b-2 hover:border-opacity-5 border-neutral-700
            border-opacity-50 hover:shadow-xl
            transition-all hover:bg-opacity-20 border flex items-center
            justify-center bg-opacity-5 h-6 w-6 p-1 aspect-square rounded-full"
          >
            <ArrowMinimize16Regular className="text-white" />
          </button>
          <button
            onClick={handleClose}
            className="bg-white nodrag border-b-2 hover:border-opacity-5
            border-neutral-700 border-opacity-50 hover:shadow-xl transition-all hover:bg-opacity-20
            border flex items-center justify-center bg-opacity-5 h-6 w-6 aspect-square rounded-full"
          >
            <Dismiss12Regular className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopBar
