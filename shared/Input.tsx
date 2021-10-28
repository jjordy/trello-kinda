import { forwardRef } from "react";

const baseClasses = `bg-white/50 appearance-none  rounded-lg w-full p-2 text-2xl text-gray-700 leading-tight focus:outline-none focus:bg-white`;

const Input = forwardRef((props: any, ref) => (
  <div className="w-full">
    <input
      ref={ref}
      type="text"
      {...props}
      className={`${props.className || baseClasses} ${
        props?.error
          ? "border-red-500 focus:border-red-500"
          : "focus:border-purple-500"
      }`}
    />
    {props?.error && <p className="ml-2 mt-2 text-sm font-medium text-red-500">{props?.error}</p>}
  </div>
));

export default Input;
