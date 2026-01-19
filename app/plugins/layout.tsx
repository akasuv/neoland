"use client";

import { Tag } from "@/components";
import React from "react";
import Link from "next/link";
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
  const [tags, setTags] = React.useState<{ name: string }[]>([]);

  React.useEffect(() => {
    const fetchTags = async () => {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string
      );
      const { data } = await supabase.from("all_tags").select();
      if (data) setTags(data);
    };
    fetchTags();
  }, []);

  return (
    <div>
      <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4 sticky top-0 transition-colors duration-300 bg-slate-900">
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
      <div className="flex items-center w-full justify-center my-8 py-20 bg-gradient-to-b from-gray-900 to-gray-800 bg-gradient-to-r">
        <h2 className="text-5xl font-black text-white font-hubot">Plugins</h2>
      </div>
      <div className="flex gap-x-4 w-full px-8 flex-col md:flex-row">
        <div className="flex flex-col md:w-80 grow-0 shrink-0 p-4 gap-y-4 w-full mb-8">
          <div className="flex flex-wrap gap-4 w-full">
            {tags?.map((tag) => <Tag key={tag.name} text={tag.name} />)}
          </div>
        </div>
        <div className="grow">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
