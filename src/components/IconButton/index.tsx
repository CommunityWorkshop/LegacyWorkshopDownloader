import { Icon } from "@iconify/react";

interface props {
  icon: string;
  onClick: () => void;
  className?: string;
}

const IconButton = ({ icon, onClick, className }: props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white border-white border-opacity-10 nodrag group
        hover:shadow-xl transition-all border-t-2
        hover:bg-opacity-10 flex items-center
        justify-center bg-opacity-5 h-8 w-8 aspect-square rounded-full ${className}`}
    >
      <Icon
        className="text-white transition-all
      group-hover:text-opacity-100 text-opacity-70"
        icon={icon}
      />
    </button>
  );
};

export default IconButton;
