import { TouchableLottie } from "@/shared/components/lottie/touchable-lottie";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import { Icons } from "@/shared/ui/icons/icons";
import clsx from "clsx";
import { useEffect, useState, type ComponentPropsWithRef } from "react";
import { GIFT_SIZES } from "../constants/gift-border-sizes-constants";
import type { GiftSizesType } from "../model/types/gift-types";

type GiftCheckboxCardProps = {
	className?: string;
	size: GiftSizesType;
	checkbox: ComponentPropsWithRef<"input">;

	slug: string;
	title: string;
	price: number;
	status?: string;
	id: number;
};

export const GiftCheckboxCard = (props: GiftCheckboxCardProps) => {
	const { className, size, checkbox, slug, title, price, status, id } = props;

	const giftUrl = `https://nft.fragment.com/gift/${slug}.lottie.json`;

	const [animationData, setAnimationData] = useState<unknown>(null);

	useEffect(() => {
		fetch(giftUrl)
			.then((res) => res.json())
			.then(setAnimationData)
			.catch(console.error);
	}, [giftUrl]);

	if (status === "Pending") {
		return (
			<article
				className={clsx(
					className,
					"bg-dark-blue-50 text-white rounded-four has-checked:bg-dark-blue-650 transition-colors h-full items-center justify-center relative",
				)}
			>
				<Icons
					name="loader"
					className="animate-spin size-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
				/>
			</article>
		);
	}
	return (
		<div className="relative group rounded-2xl overflow-hidden">
			<article
				className={clsx(
					className,
					GIFT_SIZES[size].card,
					"has-checked:bg-[#1ACAFF31] text-white has-checked:border-[#1AC9FF] has-checked:border-[2px] transition-colors rounded-2xl overflow-hidden border border-[#FFFFFF66] border-[2px]",

					// blocked && 'opacity-50 grayscale cursor-not-allowed',
				)}
				style={{ padding: 0, paddingBottom: 8 }}
			>
				<div
					className={clsx(
						GIFT_SIZES[size].image,
						"relative rounded-t-[14px] rounded-b-[8px] overflow-hidden",
					)}
				>
					<TouchableLottie
						animation={animationData}
						className="size-42.5 rounded-t-[14px] rounded-b-[8px] z-0 "
					/>
					<Checkbox
						variant="bordered"
						wrapperClassName="absolute top-2 left-2"
						// disabled={blocked}
						{...checkbox}
					/>
					{/* {blocked && (
            <div className="absolute inset-0 bg-red-500/20 rounded-four flex items-center justify-center">
              <Icons name="cross" className="size-6 text-red-500" />
            </div>
          )} */}
				</div>
				<header
					className={clsx(
						GIFT_SIZES[size].title,
						GIFT_SIZES[size].header,
						"flex items-center justify-between font-medium px-2",
					)}
				>
					<h5>{title}</h5>
					<h5>#{id}</h5>
					{/* <p>#{slug}</p> */}
				</header>
				<div className="px-2">
					<button
						type="button"
						// disabled={blocked}
						className={clsx(
							// GIFT_SIZES[size].button,
							"cursor-pointer font-medium flex items-center justify-center bg-[#FFFFFF1A] w-full rounded-xl border border-[#FFFFFF14] backdrop-blur-[20px] py-[6px] gap-1",
							// blocked && 'opacity-50 cursor-not-allowed bg-gray-500',
						)}
					>
						<span>{price}</span>
						<div className="flex items-center justify-center bg-[#0098EA] rounded-full w-4 h-4">
							<Icons name="ton" className="size-4" />
						</div>
					</button>
				</div>
			</article>
		</div>
	);
};
