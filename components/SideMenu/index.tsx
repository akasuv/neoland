"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavItem = ({
  href,
  text,
  active,
}: {
  href: string;
  text: string;
  active: boolean;
}) => (
  <Link
    className={cn(
      "py-1 pr-4 inline-flex items-center gap-2 border-r-[3px] border-transparent text-xl whitespace-nowrap text-gray-400 hover:text-white capitalize",
      active && "active"
    )}
    href={href}
  >
    {text}
  </Link>
);

const routes = [
  { pathname: "/", text: "popular" },
  { pathname: "/plugins", text: "plugins" },
  { pathname: "/color-schemes", text: "color schemes" },
];

const SideMenu = () => {
  const pathname = usePathname();
  return (
    <div>
      <nav className="-mr-0.5 flex flex-col space-y-2">
        {routes.map((route) => (
          <NavItem
            key={route.pathname}
            href={route.pathname}
            text={route.text}
            active={route.pathname === pathname}
          />
        ))}
      </nav>
    </div>
  );
};

export default SideMenu;
