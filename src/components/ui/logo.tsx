"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: number;
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ size = 32, className }) => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-1">
      <Image
        src={theme === "light" ? "/logo.svg" : "/logo-dark.svg"}
        width={size}
        height={size}
        alt="logo"
      />
      <Link
        href="/"
        className={clsx(
          "no-underline text-zinc-800 dark:text-zinc-100 text-2xl font-bold",
          className
        )}
      >
        Cliply
      </Link>
    </div>
  );
};

export default Logo;
