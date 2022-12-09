"use client";
import clsx from "clsx";
export type TagProps = {
	text: string;
	onClick?: () => void;
};

const colors = ["green"];

const Tag = ({ text, onClick }: TagProps) => {
	const color = colors[Math.floor(Math.random() * colors.length)];
	return (
		<span
			className={clsx(
				"inline-flex items-center gap-1.5 py-1 px-3 rounded-md text-xs font-medium",
				`bg-${color}-100 text-${color}-800`
			)}
			onClick={onClick}
		>
			{text}
		</span>
	);
};

export default Tag;
