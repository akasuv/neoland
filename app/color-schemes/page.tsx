import { createClient } from "@supabase/supabase-js";
import { Hero, PluginCard, Tag, ColorSchemeCard } from "@/components";
import React from "react";
import Head from "next/head";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

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

export default async function Home() {
  const { data } = await getPluginsByTag("Colorscheme");

  return (
    <div className="bg-neutral min-h-screen pb-16">
      <div className="w-full pb-8">
        <div className="flex flex-col gap-y-4 mx-auto">
          <div className="flex items-center w-full h-60 justify-center bg-gradient-to-t from-sky-500 to-indigo-500">
            <h2 className="text-5xl font-black text-white font-hubot">
              Color Schemes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 px-8 pt-12">
            {data?.map((plugin: any) => (
              <ColorSchemeCard {...plugin} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
