import { createClient } from "@supabase/supabase-js";
import { PluginCard } from "@/components";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

const PluginPage = async ({ params }) => {
	const { data, error } = await supabase
		.from("Plugins")
		.select()
		.eq("id", params.id);

	return (
		<div className="p-4">
			{data && <PluginCard {...data[0]} hideReadMe={false} />}
		</div>
	);
};

export default PluginPage;
