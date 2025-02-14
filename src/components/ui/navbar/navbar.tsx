"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiBars3BottomRight, HiXMark } from "react-icons/hi2";

const items = [
  {
    id: 0,
    title: "Home",
    href: "/dashboard",
  },
  {
    id: 1,
    title: "Links",
    href: "/dashboard/links",
  },
  {
    id: 2,
    title: "Analytics",
    href: "/dashboard/analytics",
  },
  {
    id: 3,
    title: "Settings",
    href: "/dashboard/settings",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="z-50">
      <button
        className="absolute md:hidden md:text-xs right-4 top-7 z-50 text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiXMark /> : <HiBars3BottomRight />}
      </button>
      <div
        className={clsx(
          "-z-10 md:flex flex-col md:flex-row gap-4 text-sm",
          isOpen
            ? "fixed w-full h-screen flex bg-white top-0 left-0 pt-14 pl-4"
            : "hidden"
        )}
      >
        {items.map((el) => (
          <Link
            onClick={() => setIsOpen(false)}
            key={el.id}
            href={el.href}
            className={clsx(
              "no-underline px-4 py-2 rounded-full font-semibold transition-all ease duration-200 w-fit",
              pathname === el.href
                ? "bg-zinc-100 text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-800"
            )}
          >
            {el.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
