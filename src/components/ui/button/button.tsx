"use client";

import clsx from "clsx";
import Link from "next/link";
import Loader from "../loader/loader";

type ButtonProps = {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  fit?: boolean;
  linkTo?: string;
  variant?: "primary" | "secondary" | "grey" | "dark" | "success";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: "string";
  loader?: boolean;
};

const variations = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  grey: "bg-zinc-400 text-white hover:bg-primary",
  dark: "bg-zinc-900 text-white hover:bg-zinc-800",
  success: "bg-green-500 text-white cursor-not-allowed",
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
}) => {
  const style = clsx(
    "flex justify-center gap-2 px-6 py-4 font-medium text-sm rounded-2xl transition-all ease-in-out duration-300",
    fit ? "w-fit" : "w-full",
    disabled
      ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
      : variations[variant],
    className
  );

  if (linkTo) {
    return (
      <Link className={style} href={linkTo}>
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
