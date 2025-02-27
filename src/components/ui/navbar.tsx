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
    icon: <HiHome size={18} />,
  },
  {
    id: 1,
    title: "Links",
    href: "/dashboard/links",
    icon: <HiQueueList size={18} />,
  },
  {
    id: 2,
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <HiChartBar size={18} />,
  },
  {
    id: 3,
    title: "Settings",
    href: "/dashboard/settings",
    icon: <HiCog6Tooth size={18} />,
  },
];

const Navbar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="absolute md:hidden md:text-xs right-10 top-[42px] z-[999] text-2xl text-zinc-800 dark:text-zinc-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiXMark /> : <HiBars3BottomRight />}
      </button>
      <div
        className={clsx(
          "md:flex flex-col md:flex-row gap-4 text-sm",
          isOpen
            ? "fixed w-screen h-screen min-h-full flex bg-white dark:bg-zinc-900 top-0 left-0 pt-20 pl-4 pb-8 rounded-3xl z-50"
            : "hidden -z-10"
        )}
      >
        {items.map((el) => (
          <Link
            onClick={() => setIsOpen(false)}
            key={el.id}
            href={el.href}
            className={clsx(
              "flex gap-2 items-center no-underline px-4 py-2 rounded-full font-semibold transition-all ease duration-200 w-fit",
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
