"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TabsProps = {
  tabs: {
    title: string;
    href: string;
  }[];
};

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const pathname = usePathname();

  return (
    <div className="bg-white dark:bg-zinc-800 w-fit flex md:gap-2 p-1 rounded-full">
      {tabs.map((el) => (
        <Link
          className={clsx(
            "no-underline font-semibold text-sm px-4 py-2 rounded-full",
            pathname === el.href
              ? "bg-zinc-800 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200"
          )}
          key={el.title}
          href={el.href}
        >
          {el.title}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
