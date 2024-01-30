import { ColorSchemeCard, Hero, PluginCard, Search, Tag } from "@/components";
import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faHandsClapping,
} from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeoLand",
  description: "The best Neovim plugin resources",
};

async function getPluginsByTag(tag: string) {
  const { data, error } = await supabase
    .from("all_plugins")
    .select("*")
    .contains("tags", [tag])
    .limit(6);

  return { data };
}

export default async function Home() {
  const { data: colorschemes } = await getPluginsByTag("Colorscheme");
  const { data: pluginManagers } = await getPluginsByTag("Plugin Manager");

  return (
    <div className="bg-neutral min-h-screen pb-16">
      <header className="pt-8 pb-16 px-4 flex flex-col items-center relative gap-y-4  relative ">
        <div className="w-full flex justify-end">
          <a
            href="https://github.com/akasuv/neoland"
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm bg-gray-700 hover:bg-gray-600 focus:ring-gray-600 focus:ring-offset-gray-800"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
            <p>GitHub</p>
          </a>
        </div>
        <div className="w-[200px]">
          <img src="neoland.svg" width="100%" />
        </div>
        <a
          className="flex items-center gap-x-2"
          href="https://github.com/akasuv/neoland/issues/new?assignees=&labels=plugin+submit&template=plugin-submit.md&title=New+plugin"
          target="_blank"
        >
          <FontAwesomeIcon icon={faHandsClapping} />
          <p>Submit your awesome Neovim plugin!</p>
        </a>
        <div className="pt-4 w-full md:w-1/2">
          <Search />
        </div>
        <div className="mt-4 w-full">
          <Hero />
        </div>
      </header>

      <div className="w-full pb-8">
        <div className="flex flex-col gap-y-4 px-8 mx-auto">
          <div className="flex items-center gap-x-4 w-full">
            <h2 className="text-2xl font-semibold text-white">Color Schemes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
            {colorschemes?.map((plugin: any) => (
              <ColorSchemeCard {...plugin} />
            ))}
          </div>
          <a
            className="mt-4 py-3 self-center max-w-fit bg-gradient-to-r from-sky-500 to-indigo-500 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm "
            href="/color-schemes"
          >
            All Color Schemes
            <FontAwesomeIcon icon={faAngleRight} size="sm" />
          </a>
        </div>
      </div>
      <main className="w-full flex flex-col items-center">
        <div className="flex flex-col gap-y-4 p-8 mx-auto w-full">
          <h2 className="text-2xl font-semibold">Plugin Manager</h2>
          {pluginManagers?.map((plugin: any) => <PluginCard {...plugin} />)}
        </div>
        <a
          className="mt-4 py-3 self-center max-w-fit bg-gradient-to-r from-sky-500 to-indigo-500 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm "
          href="/plugins"
        >
          Plugin Hunt !
          <FontAwesomeIcon icon={faAngleRight} size="sm" />
        </a>
      </main>
    </div>
  );
}
