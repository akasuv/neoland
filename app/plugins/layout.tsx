import Tag from "@/components/Tag";
import PluginsNav from "@/components/PluginsNav";
import { supabase } from "@/config";

async function getTags() {
  const { data } = await supabase.from("all_tags").select();
  return data ?? [];
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const tags = await getTags();

  return (
    <div>
      <PluginsNav />
      <div className="flex items-center w-full justify-center my-8 py-20 bg-gradient-to-b from-gray-900 to-gray-800 bg-gradient-to-r">
        <h2 className="text-5xl font-black text-white font-hubot">Plugins</h2>
      </div>
      <div className="flex gap-x-4 w-full px-8 flex-col md:flex-row">
        <div className="flex flex-col md:w-80 grow-0 shrink-0 p-4 gap-y-4 w-full mb-8">
          <div className="flex flex-wrap gap-4 w-full">
            {tags.map((tag: { name: string }) => <Tag key={tag.name} text={tag.name} />)}
          </div>
        </div>
        <div className="grow">{children}</div>
      </div>
    </div>
  );
}
