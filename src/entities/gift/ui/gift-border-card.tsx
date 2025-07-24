import { LoadableLottie } from "@/shared/components/lottie/loadable-lottie";
import { TouchableLottie } from "@/shared/components/lottie/touchable-lottie";
import { Icons } from "@/shared/ui/icons/icons";
import clsx from "clsx";
import { GIFT_SIZES } from "../constants/gift-border-sizes-constants";
import type { GiftSizesType } from "../model/types/gift-types";

type GiftBorderCardProps = {
	className?: string;
	size: GiftSizesType;

	slug: string;
	title: string;
	price: number;
	status: string;
};

export const GiftBorderCard = (props: GiftBorderCardProps) => {
	const { size, className, slug, title, price, status } = props;

	if (status === "Pending") {
		return (
			<article
				className={clsx(
					className,
					GIFT_SIZES[size].card,
					"bg-dark-blue-50 text-white rounded-2xl flex items-center px-4 py-2 border border-[#77777778] relative",
				)}
			>
				<div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl">
					<Icons name="loader" className="animate-spin size-8" />
				</div>

				<div className="blur-[2px] flex items-center w-full">
					<div
						className={clsx(
							"w-[60px] h-[60px]",
							"relative overflow-hidden border border-[#494A4A] rounded-xl",
						)}
					>
						<LoadableLottie slug={slug}>
							{(animationData) => (
								<TouchableLottie
									animation={animationData}
									className="absolute size-full inset-0 object-cover overflow-hidden rounded-four"
								/>
							)}
						</LoadableLottie>
					</div>

					<header
						className={clsx("flex items-center font-regular flex-1 ml-2")}
					>
						<h5>{title}</h5>
					</header>
					<div className="flex items-center gap-2 font-bold text-lg">
						<span>{price}</span>
						<div className="flex items-center bg-[#0098EA] rounded-full w-[16px] h-[16px] justify-center">
							<Icons name="ton" className="size-[14px]" />
						</div>
					</div>
				</div>
			</article>
		);
	}

	return (
		<article
			className={clsx(
				className,
				GIFT_SIZES[size].card,
				"bg-dark-blue-50 text-white rounded-2xl flex items-center px-4 py-2 border border-[#77777778] ",
			)}
		>
			<div
				className={clsx(
					"w-[60px] h-[60px]",
					// GIFT_SIZES[size].image,
					"relative overflow-hidden border border-[#494A4A] rounded-xl",
				)}
			>
				<LoadableLottie slug={slug}>
					{(animationData) => (
						<TouchableLottie
							animation={animationData}
							className="absolute size-full inset-0 object-cover overflow-hidden rounded-four"
						/>
					)}
				</LoadableLottie>
			</div>

			<header className={clsx("flex items-center font-regular flex-1 ml-2")}>
				<h5>{title}</h5>
			</header>
			<div className="flex items-center gap-2 font-bold text-lg">
				<span>{price}</span>
				<div className="flex items-center bg-[#0098EA] rounded-full w-[16px] h-[16px] justify-center">
					<Icons name="ton" className="size-[14px]" />
				</div>
			</div>
		</article>
	);
};
