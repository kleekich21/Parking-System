import ClipLoader from "react-spinners/ClipLoader";

type ButtonType = "primary" | "secondary" | "danger";

interface ButtonProps {
  type?: ButtonType;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({
  children,
  type = "primary",
  isLoading,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = `
    border-radius-8px
    border
    border-solid
    border-transparent
    px-5
    py-2.5
    text-base
    font-medium
    font-inherit
    cursor-pointer
    transition-all
    duration-250
    disabled:opacity-50
    disabled:cursor-not-allowed
    focus:outline-4
    focus:outline-offset-1
    focus:-outline-focus-ring-color
    rounded-md
  `;

  const typeStyles = {
    primary: `
      bg-blue-900
      text-white
      hover:border-indigo-500
      active:bg-blue-800
    `,
    secondary: `
      bg-white
      text-gray-900
      border-gray-200
      hover:border-indigo-500
      active:bg-gray-500
    `,
    danger: `
      bg-red-600
      text-white
      hover:border-red-400
      active:bg-red-700
    `,
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${typeStyles[type]}
        ${className}
      `}
      disabled={isLoading || disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && <ClipLoader size={14} color="currentColor" />}
        {children}
      </div>
    </button>
  );
}

export default Button;
