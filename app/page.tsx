import { createClient } from "@supabase/supabase-js";
import { Hero, PluginCard, Tag, ColorSchemeCard } from "@/components";
import React from "react";
import Head from "next/head";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

async function getPluginsByTag(tag: string) {
  const { data, error } = await supabase
    .from("Plugins")
    .select()
    .filter("tag1", "eq", tag);
  return { data };
}

async function getTags() {
  const { data, error } = await supabase.from("Tags").select();
  return { data };
}

async function getPlugins() {
  const tags = await getTags();

  if (tags.data) {
    const plugins = await Promise.all(
      tags.data.map(async (tag) => {
        const plugins = await getPluginsByTag(tag.primary);
        return { tag: tag.primary, plugins: plugins.data };
      })
    );

    return { data: plugins };
  }

  return { data: [] };
}

export default async function Home() {
  const tags = await getTags();
  const { data } = await getPlugins();

  return (
    <div className="bg-neutral min-h-screen pb-16">
      <header className="pt-8 pb-16 px-4 flex flex-col items-center relative gap-y-4  relative ">
        <div className="w-full flex justify-end">
          <button
            type="button"
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md bg-gray-100 border border-transparent font-semibold text-gray-500 hover:text-white hover:bg-gray-500 focus:outline-none focus:ring-2 ring-offset-white focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 dark:text-white dark:focus:ring-offset-gray-800"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
            <p>GitHub</p>
          </button>
        </div>
        <h1 className="text-5xl font-black font-hubot  text-center ">
          NeoLand
        </h1>
        <div className="pt-10 w-full md:w-1/2">
          {/* <Hero /> */}
          <div>
            <label className="sr-only">Label</label>
            <div className="relative flex rounded-md shadow-sm">
              <input
                type="text"
                id="hs-trailing-button-add-on-with-icon-and-button"
                name="hs-trailing-button-add-on-with-icon-and-button"
                className="py-3 px-0 md:px-4 pl-11 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                <svg
                  className="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
              <button
                type="button"
                className="py-3 px-4 inline-flex flex-shrink-0 justify-center items-center rounded-r-md border border-transparent font-semibold bg-green-300 text-green-900 hover:bg-green-400 focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 flex-wrap w-3/4 justify-center pt-4 gap-y-4">
          {tags?.data.slice(0, 10).map((tag) => (
            <Tag text={tag.primary} />
          ))}
        </div>
      </header>
      <div className="w-full pb-8">
        {data
          .filter((item) => item.tag.toLowerCase() === "colorscheme")
          .map((item: any) => (
            <div className="flex flex-col gap-y-4 px-8 mx-auto">
              <h2 className="text-2xl font-semibold">Color Schemes</h2>
              <div className="flex flex-wrap w-full gap-4 justify-center">
                {item.plugins.slice(0, 8).map((plugin: any) => (
                  <ColorSchemeCard {...plugin} />
                ))}
              </div>
            </div>
          ))}
      </div>
      <main className="w-full">
        {data
          .filter((item) => item.tag.toLowerCase() !== "colorscheme")
          .map((item: any) => (
            <div className="flex flex-col gap-y-4 p-8 mx-auto">
              <h2 className="text-2xl font-semibold">{item.tag}</h2>
              {item.plugins.map((plugin: any) => (
                <PluginCard {...plugin} />
              ))}
            </div>
          ))}
      </main>
    </div>
  );
}
