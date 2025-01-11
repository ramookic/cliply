"use client";

import clsx from "clsx";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  fit?: boolean;
  linkTo?: string;
  variant?: "primary" | "secondary" | "dark";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: "string";
};

const variations = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  dark: "bg-zinc-900 text-white hover:bg-zinc-800",
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
}) => {
  const style = clsx(
    "px-6 py-3 font-medium text-sm rounded-full transition-all ease-in-out duration-300",
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
      {children}
    </button>
  );
};

export default Button;
