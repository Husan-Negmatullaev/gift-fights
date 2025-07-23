import clsx from "clsx";

type RefStatItemProps = {
	title: string;
	value: number;
	isTon?: boolean;
	isPercent?: boolean;
};

export const RefStatItem = (props: RefStatItemProps) => {
	const { title, value, isTon, isPercent } = props;

	return (
		<article
			className={clsx(
				"bg-[#FFFFFF1A] backdrop-blur-[20px] text-white rounded-2xl flex items-center p-4 border border-[#77777778] ",
			)}
		>
			<header
				className={clsx(
					"flex items-center font-regular flex-1 ml-2 text-[#A8A8A8]",
				)}
			>
				<h5>{title}</h5>
			</header>
			<div className="flex items-center gap-1 font-bold text-lg">
				<span>{value}</span>
				{isTon && <span>{"TON"}</span>}
				{isPercent && <span>{"%"}</span>}
			</div>
		</article>
	);
};
