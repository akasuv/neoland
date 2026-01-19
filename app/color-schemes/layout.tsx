"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NavLinks = () => (
  <>
    <Link href="/color-schemes">
      <p>Color Schemes</p>
    </Link>
    <Link href="/plugins">
      <p>Plugins</p>
    </Link>
    <a href="https://neovim.io">
      <p>Neovim</p>
    </a>
    <a href="https://github.com/akasuv/neoland">
      <p>GitHub</p>
    </a>
  </>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [bgColor, setBgColor] = React.useState("bg-indigo-500");

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setBgColor("bg-slate-900");
      } else {
        setBgColor("bg-indigo-500");
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <header
        className={cn(
          "relative flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 sticky top-0 transition-colors duration-300",
          bgColor,
        )}
      >
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link
              className="flex-none text-xl font-semibold text-white"
              href="/"
            >
              NeoLand
            </Link>
            <div className="sm:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-gray-800 hover:bg-slate-800 border-gray-700 text-gray-400 hover:text-white"
                  >
                    <Menu className="w-4 h-4" />
                    <span className="sr-only">Toggle navigation</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-slate-900 border-gray-700">
                  <div className="flex flex-col gap-5 mt-8">
                    <NavLinks />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
            <NavLinks />
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default Layout;
