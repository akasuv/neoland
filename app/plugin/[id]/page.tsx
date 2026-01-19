import { PluginCard } from "@/components";
import type { Metadata } from "next";
import { supabase } from "@/config";

async function getPluginById(id: string) {
  const { data } = await supabase.from("all_plugins").select().eq("id", id);

  return { data };
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data } = await getPluginById(id);

  return {
    title: "NeoLand - " + data?.[0].name,
    description: "The best Neovim plugin resource, " + data?.[0].description,
  };
}

const PluginPage = async ({ params }: Props) => {
  const { id } = await params;
  const { data } = await getPluginById(id);
  return (
    <div className="p-4">
      {data && <PluginCard {...data[0]} hideReadMe={false} />}
    </div>
  );
};

export default PluginPage;
