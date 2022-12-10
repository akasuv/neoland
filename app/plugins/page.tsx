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

async function getPlugins() {
	const { data, error } = await supabase.from("Plugins").select();
	return { data };
}

const Plugins = async () => {
	const { data } = await getPlugins();

	return (
		<div className="px-4 flex flex-col gap-y-4 w-full grow-0">
			{data?.map((plugin: any) => (
				<PluginCard {...plugin} />
			))}
		</div>
	);
};
export default Plugins;
