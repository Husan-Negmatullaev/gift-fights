import clsx from "clsx";

type AvatarProps = {
	url: string;
	className: string;
	style?: React.CSSProperties;
	// size: AvatarSizesType;
};

export const Avatar = (props: AvatarProps) => {
	const { url, className, style } = props;

	return (
		<div
			style={style}
			className={clsx(
				className,
				// AVATAR_SIZES_CONSTANTS[size],
				"rounded-full overflow-hidden",
			)}
		>
			<img
				src={url}
				alt="user avatar"
				className="size-full border border-[#494A4A] border-[2.5px] rounded-full"
			/>
		</div>
	);
};
