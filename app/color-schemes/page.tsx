import { ColorSchemeCard } from "@/components";
import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { supabase } from "@/config";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeoLand - Color Schemes",
  description:
    "The best Neovim plugin resources, the best Neovim color scheme resources",
};

async function getPluginsByTag(tag: string) {
  const { data } = await supabase
    .from("all_plugins")
    .select("*")
    .contains("tags", [tag]);

  return { data };
}

export default async function Home() {
  const { data } = await getPluginsByTag("Colorscheme");

  return (
    <div className="bg-neutral min-h-screen pb-16">
      <div className="w-full pb-8">
        <div className="flex flex-col gap-y-4 mx-auto">
          <div className="flex items-center w-full h-60 justify-center bg-gradient-to-t from-sky-500 to-indigo-500 px-8">
            <h2 className="text-5xl font-black text-white font-hubot">
              Color Schemes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 px-8 pt-12">
            {data?.map((plugin: any) => <ColorSchemeCard {...plugin} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
