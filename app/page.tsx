import { createClient } from "@supabase/supabase-js";
import { Hero, PluginCard, Tag, ColorSchemeCard, Search } from "@/components";
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
	const { data } = await getPlugins();

	return (
		<div className="bg-neutral min-h-screen pb-16">
			<header className="pt-8 pb-16 px-4 flex flex-col items-center relative gap-y-4  relative ">
				<div className="w-full flex justify-end">
					<a
						href="https://github.com/akasuv/neoland"
						className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm bg-gray-700 hover:bg-gray-600 focus:ring-gray-600 focus:ring-offset-gray-800"
					>
						<FontAwesomeIcon icon={faGithub} size="lg" />
						<p>GitHub</p>
					</a>
				</div>
				<h1 className="text-5xl font-black font-hubot  text-center ">
					NeoLand
				</h1>
				<div className="pt-10 w-full md:w-1/2">
					<Search />
				</div>
				<div className="mt-4 w-full">
					<Hero />
				</div>
			</header>
			<div className="w-full pb-8">
				{data
					.filter((item) => item.tag.toLowerCase() === "colorscheme")
					.map((item: any) => (
						<div className="flex flex-col gap-y-4 px-8 mx-auto">
							<div className="flex items-center gap-x-4 w-full">
								<h2 className="text-2xl font-semibold text-white">
									Color Schemes
								</h2>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
								{item.plugins.slice(0, 6).map((plugin: any) => (
									<ColorSchemeCard {...plugin} />
								))}
							</div>
							<a
								className="mt-4 py-3 self-center max-w-fit bg-gradient-to-r from-sky-500 to-indigo-500 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm "
								href="/color-schemes"
							>
								All Color Schemes
								<FontAwesomeIcon icon={faAngleRight} size="sm" />
							</a>
						</div>
					))}
			</div>
			<main className="w-full flex flex-col items-center">
				{data
					.filter((item) => item.tag.toLowerCase() == "plugin manager")
					.map((item: any) => (
						<div className="flex flex-col gap-y-4 p-8 mx-auto w-full">
							<h2 className="text-2xl font-semibold">{item.tag}</h2>
							{item.plugins.map((plugin: any) => (
								<PluginCard {...plugin} />
							))}
						</div>
					))}
				<a
					className="mt-4 py-3 self-center max-w-fit bg-gradient-to-r from-sky-500 to-indigo-500 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm "
					href="/plugins"
				>
					Plugin Hunt !
					<FontAwesomeIcon icon={faAngleRight} size="sm" />
				</a>
			</main>
		</div>
	);
}
