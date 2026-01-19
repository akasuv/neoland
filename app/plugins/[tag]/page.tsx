import { PluginCard } from "@/components";
import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { supabase } from "@/config";

type Props = {
  params: Promise<{ tag: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);

  return {
    title: "NeoLand - " + tag,
    description: "The best Neovim plugin resources for " + tag,
  };
}

async function getPluginsByTag(tag: string) {
  const { data } = await supabase
    .from("all_plugins")
    .select()
    .contains("tags", [tag]);

  return { data };
}

const Page = async ({ params }: Props) => {
  const { tag: rawTag } = await params;
  const tag = decodeURIComponent(rawTag);
  const { data } = await getPluginsByTag(tag);

  return (
    <div className="px-4 grow">
      <h2 className="text-2xl font-bold pb-4">{tag}</h2>
      <div className="flex flex-col gap-y-4 w-full grow-0 ">
        {data?.map((plugin: any) => <PluginCard key={plugin.id} {...plugin} />)}
      </div>
    </div>
  );
};

export default Page;
