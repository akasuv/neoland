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

async function getPluginsByTag(tag: string) {
	const { data, error } = await supabase
		.from("Plugins")
		.select()
		.eq("tag1", tag);

	console.log(data, error);

	return { data };
}

const Page = async ({ params }) => {
	const tag = decodeURIComponent(params.tag);
	const { data } = await getPluginsByTag(tag);

	return (
		<div className="px-4 grow">
			<h2 className="text-2xl font-bold pb-4">{tag}</h2>
			<div className="flex flex-col gap-y-4 w-full grow-0 ">
				{data?.map((plugin: any) => (
					<PluginCard {...plugin} />
				))}
			</div>
		</div>
	);
};

export default Page;
