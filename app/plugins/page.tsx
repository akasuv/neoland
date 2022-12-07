import { createClient } from "@supabase/supabase-js";
import { Hero, PluginCard, Tag, ColorSchemeCard } from "@/components";
import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

async function getTags() {
  const { data, error } = await supabase.from("Tags").select();
  return { data };
}

async function getPlugins() {
  const { data, error } = await supabase.from("Plugins").select();
  return { data };
}

const Plugins = async () => {
  const tags = await getTags();
  const { data } = await getPlugins();

  return (
    <div>
      <div className="flex items-center w-full justify-center my-8 py-20 bg-gradient-to-b from-gray-900 to-gray-800 bg-gradient-to-r">
        <h2 className="text-5xl font-black text-white font-hubot">Plugins</h2>
      </div>
      <div className="flex gap-x-4 w-full px-8">
        <div className="flex flex-col w-80 grow w-60 p-4 gap-y-4">
          <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
            <li className="inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 dark:text-white">
              Popular
            </li>
            <li className="inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 dark:text-white">
              New
            </li>
            <li className="inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 dark:text-white">
              All
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
            {tags?.data?.slice(0, 10).map((tag) => (
              <Tag text={tag.primary} />
            ))}
          </div>
        </div>
        <div className="px-4 flex flex-col gap-y-4 w-3/4 grow-0">
          {data?.map((plugin: any) => (
            <PluginCard {...plugin} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Plugins;
