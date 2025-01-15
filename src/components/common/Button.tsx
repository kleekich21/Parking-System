import ClipLoader from "react-spinners/ClipLoader";

type ButtonType = "primary" | "secondary" | "danger";

interface ButtonProps {
  type?: ButtonType;
  isLoading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const typeStyles: Record<ButtonType, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-200",
  secondary: "bg-gray-500 text-gray-700 hover:bg-gray-200 focus:ring-gray-200",
  danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-200",
};

export function Button({
  type = "primary",
  isLoading = false,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-md font-medium
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${typeStyles[type]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <ClipLoader size={14} color="#ffffff" className="mr-2" />}
      {children}
    </button>
  );
}
