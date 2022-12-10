"use client";
import clsx from "clsx";
export type TagProps = {
	text: string;
	onClick?: () => void;
};

const Tag = ({ text, onClick }: TagProps) => {
	return (
		<a
			href={`/plugins/${text}`}
			className={clsx(
				"inline-flex items-center gap-1.5 py-1 px-3 rounded-md text-xs font-medium",
				`bg-green-100 text-green-800`
			)}
			onClick={onClick}
		>
			{text}
		</a>
	);
};

export default Tag;
