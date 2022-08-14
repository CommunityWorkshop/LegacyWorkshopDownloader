import { ReactNode } from 'react'

const NavigationItem = ({
  Icon,
  name,
  onClick,
  isSelected,
}: {
  Icon: ReactNode
  name: string
  onClick: () => void
  isSelected: boolean
}) => {
  // * States

  // * Effects

  // * Functions

  return (
    <button
      onClick={onClick}
      className={`flex nodrag z-40 my-2 transition-all hover:bg-white px-4 hover:bg-opacity-5
      items-center rounded-lg flex-row ${
        isSelected && 'bg-white bg-opacity-10'
      }`}
    >
      {Icon}
      <h3 className="text-lg ml-2 text-white">{name}</h3>
    </button>
  )
}

export default NavigationItem
