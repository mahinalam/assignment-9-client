const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: {
  label?: any;
  onClick?: any;
  disabled?: any;
  outline?: any;
  small?: any;
  icon?: any;
}) => {
  return (
    <button
      className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            px-4
            w-full
            ${outline ? "bg-white" : "bg-rose-500"}
            ${outline ? "border-black" : "border-rose-500"}
            ${outline ? "text-black" : "text-white"}
            ${small ? "text-sm" : "text-md"}
            ${small ? "py-1" : "py-3"}
            ${small ? "font-light" : "font-semibold"}
            ${small ? "border-[1px]" : "border-2"}
          `}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && (
        <Icon
          className="
                absolute
                left-4
                top-3
              "
          size={24}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
