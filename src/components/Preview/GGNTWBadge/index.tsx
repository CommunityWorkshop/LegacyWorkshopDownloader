import { handleOpenGGNTW } from '@/utils/handleOpenGGNTW'
import logo from './logo.png'

const GGNTWBadge = () => {
  return (
    <button
      onClick={handleOpenGGNTW}
      className="flex transition-all hover:bg-primary-dark absolute -right-8
    -top-8 p-2 rounded-full group bg-primary-default shadow-lg border border-white border-opacity-5"
    >
      <img
        className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-all"
        src={logo}
      />
    </button>
  )
}

export default GGNTWBadge
