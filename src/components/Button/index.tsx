import { ReactNode } from 'react'

const Button = ({
  text,
  icon,
  onClick,
  className,
  primary,
}: {
  text: string
  onClick: () => void
  icon?: ReactNode
  className?: string
  primary?: boolean
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 border-white border-opacity-20 border-t-2 hover:shadow-lg flex flex-row items-center justify-center transition-all text-sm
      rounded-full py-1 text-white  ${
        primary
          ? 'bg-primary-light hover:bg-indigo-800 '
          : 'bg-white bg-opacity-5 hover:bg-opacity-10 '
      }  ${className}`}
    >
      {icon && icon}
      {text}
    </button>
  )
}

export default Button
