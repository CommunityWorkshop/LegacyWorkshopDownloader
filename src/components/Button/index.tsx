import { ReactNode } from "react";

const Button = ({
  text,
  icon,
  onClick,
  className,
}: {
  text: string;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 border-white border-opacity-20 border-t-2  hover:shadow-lg flex flex-row items-center justify-center hover:bg-opacity-10 transition-all text-sm
      rounded-full py-1 text-white bg-white bg-opacity-5 ${className}`}
    >
      {icon && icon}
      {text}
    </button>
  );
};

export default Button;
