import { PluginCard } from "@/components";
import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { supabase } from "@/config";

export const metadata: Metadata = {
  title: "NeoLand - Plugins",
  description: "The best Neovim plugin resources",
};

async function getPlugins() {
  const { data } = await supabase.from("all_plugins").select();

  return { data };
}

const Plugins = async () => {
  const { data } = await getPlugins();

  return (
    <div className="px-4 flex flex-col gap-y-4 w-full grow-0">
      {data?.map((plugin: any) => <PluginCard {...plugin} />)}
    </div>
  );
};
export default Plugins;
