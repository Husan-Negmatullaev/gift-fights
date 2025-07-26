import clsx from "clsx";
import { useState } from "react";

type AvatarProps = {
	url: string;
	className: string;
	style?: React.CSSProperties;
	// size: AvatarSizesType;
};

export const Avatar = (props: AvatarProps) => {
	const { url, className, style } = props;
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<div
			style={style}
			className={clsx(
				className,
				// AVATAR_SIZES_CONSTANTS[size],
				"rounded-full overflow-hidden",
			)}
		>
			{!imageError ? (
				<img
					src={url}
					alt="user avatar"
					className="size-full border border-[#494A4A] border-[2.5px] rounded-full"
					onError={handleImageError}
				/>
			) : (
				<img
					src="assets/images/main/pepe_heart.webp"
					alt="user avatar"
					className="size-full border border-[#494A4A] border-[2.5px] rounded-full bg-[#5B5B5B]"
					onError={handleImageError}
				/>
			)}
		</div>
	);
};
