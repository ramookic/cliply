"use client";

import clsx from "clsx";
import Link from "next/link";
import Loader from "./loader";

type ButtonProps = {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  fit?: boolean;
  linkTo?: string;
  variant?: "primary" | "secondary" | "outline" | "dark" | "success" | "danger";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: "string";
  loader?: boolean;
  small?: boolean;
};

const variations = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  outline:
    "outline outline-2 outline-zinc-200 dark:outline-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800",
  dark: "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900",
  success: "bg-green-500 text-white cursor-not-allowed",
  danger: "bg-red-500 text-white",
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  disabled = false,
  fit = false,
  linkTo,
  variant = "primary",
  onClick,
  className,
  loader = false,
  small = false,
}) => {
  const style = clsx(
    "flex justify-center gap-2 font-semibold text-sm rounded-2xl transition-all ease-in-out duration-300",
    small ? "px-4 py-2 rounded-xl" : "px-6 py-4 rounded-2xl",
    fit ? "w-fit" : "w-full",
    disabled
      ? "bg-zinc-200 text-zinc-400 cursor-not-allowed dark:bg-zinc-700"
      : variations[variant],
    className
  );

  if (linkTo) {
    return (
      <Link className={`${style} no-underline`} href={linkTo}>
        {children}
      </Link>
    );
  }

  return (
    <button className={style} onClick={onClick} type={type} disabled={disabled}>
      {loader && <Loader />}
      {children}
    </button>
  );
};

export default Button;
