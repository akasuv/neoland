"use client";
import { createClient } from "@supabase/supabase-js";
import clsx from "clsx";
import React from "react";
import { Tag } from "@/components";
import type { Plugin } from "@/type";

const ListItem = ({ name, link, tag1, id }: Plugin) => (
	<a href={`/plugin/${id}`} className="w-full">
		<li className="inline-flex w-full items-center justify-between gap-x-2 py-4 px-4 text-sm font-medium -mt-px  first:mt-0 last:rounded-b-lg bg-gray-800  hover:bg-gray-900 text-white hover:rounded-md">
			<span>{name} </span>
			<Tag text={tag1} />
		</li>
	</a>
);
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL as string,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);
const Search = () => {
	const [value, setValue] = React.useState("");
	const [isFocused, setIsFocused] = React.useState(false);
	const [isHovered, setIsHovered] = React.useState(false);
	const [result, setResult] = React.useState<Plugin[]>([]);
	const [noResult, setNoResult] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const resetSearch = () => {
		setLoading(false);
		setNoResult(false);
		setResult([]);
	};

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		resetSearch();
		setValue(event.target.value);

		if (event.target.value) {
			setLoading(true);
			const { data, error } = await supabase
				.from("Plugins")
				.select()
				.ilike("name", `%${event.target.value}%`);

			setLoading(false);
			if (data?.length) {
				setResult(data);
			} else {
				setNoResult(true);
			}
		}
	};

	return (
		<div>
			<div className="relative flex rounded-md shadow-sm relative">
				<input
					type="text"
					value={value}
					onChange={handleChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className={clsx(
						"py-3 px-4 block w-full shadow-sm focus-visible:outline-0 rounded-md bg-gray-800 border-gray-700 text-gray-400",
						{ "rounded-bl-none rounded-br-none": isFocused || isHovered }
					)}
					placeholder="Looking for plugins?"
				/>
				{
					<ul
						className={clsx(
							"w-full border-t border-t-gray-700 flex flex-col absolute py-4 top-12 px-2 bg-gray-800 rounded-br-lg rounded-bl-lg shadow-md max-h-80 overflow-auto",
							{ hidden: !isFocused && !isHovered }
						)}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						{value && result.length > 0 ? (
							result.map((item) => <ListItem {...item} />)
						) : (
							<li className="p-4 text-sm text-gray-400">
								{loading
									? "Searching..."
									: noResult
										? "No results"
										: "Search for plugins"}
							</li>
						)}
					</ul>
				}
			</div>
		</div>
	);
};

export default Search;
