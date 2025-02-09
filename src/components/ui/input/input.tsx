"use client";

import clsx from "clsx";
import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  type: string;
  isPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  isPassword,
  type,
  ...props
}) => {
  const [inputType, setInputType] = useState(type);

  return (
    <div className="flex flex-col gap-1 relative">
      {label && (
        <label htmlFor={props.id} className="text-sm font-bold text-zinc-800">
          {label}
        </label>
      )}
      <input
        id={props.id}
        type={inputType}
        {...props}
        className={clsx(
          "w-full px-6 py-4 bg-zinc-100 text-zinc-800 text-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-zinc-200",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      />
      <div className="absolute right-4 top-[32px]">
        {isPassword && (
          <button
            type="button"
            className="text-lg text-zinc-400 bg-zinc-100 pl-4 py-2 border-none outline-none"
            onClick={() =>
              setInputType(inputType === "password" ? "text" : "password")
            }
          >
            {inputType === "password" ? <HiEyeSlash /> : <HiEye />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
