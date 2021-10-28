
interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}


const baseClasses = `flex items-center justify-center font-medium px-3 py-2 text-white bg-gray-50/50 hover:bg-green-500 transition-all rounded-lg ease-in-out duration-200`

export default function Button({
  children,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      //@ts-ignore
      type={type}
      className={`${baseClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
