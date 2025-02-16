"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HiBars3BottomRight,
  HiChartBar,
  HiCog6Tooth,
  HiHome,
  HiQueueList,
  HiXMark,
} from "react-icons/hi2";

const items = [
  {
    id: 0,
    title: "Home",
    href: "/dashboard",
    icon: <HiHome />,
  },
  {
    id: 1,
    title: "Links",
    href: "/dashboard/links",
    icon: <HiQueueList />,
  },
  {
    id: 2,
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <HiChartBar />,
  },
  {
    id: 3,
    title: "Settings",
    href: "/dashboard/settings",
    icon: <HiCog6Tooth />,
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="z-50">
      <button
        className="absolute md:hidden md:text-xs right-10 top-[42px] z-50 text-2xl text-zinc-800 dark:text-zinc-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiXMark /> : <HiBars3BottomRight />}
      </button>
      <div
        className={clsx(
          "-z-10 md:flex flex-col md:flex-row gap-4 text-sm",
          isOpen
            ? "fixed w-full h-screen flex bg-white dark:bg-zinc-900 top-0 left-0 pt-20 pl-4 pb-8 rounded-3xl"
            : "hidden"
        )}
      >
        {items.map((el) => (
          <Link
            onClick={() => setIsOpen(false)}
            key={el.id}
            href={el.href}
            className={clsx(
              "flex gap-1 items-center no-underline px-4 py-2 rounded-full font-semibold transition-all ease duration-200 w-fit",
              pathname === el.href
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200"
            )}
          >
            {el.icon} {el.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
