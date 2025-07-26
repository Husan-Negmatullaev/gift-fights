import { LoadableLottie } from "@/shared/components/lottie/loadable-lottie";
import { TouchableLottie } from "@/shared/components/lottie/touchable-lottie";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import { Icons } from "@/shared/ui/icons/icons";
import clsx from "clsx";
import { GIFT_SIZES } from "../constants/gift-border-sizes-constants";
import type { GiftSizesType } from "../model/types/gift-types";

type SelectableItemGiftProps = {
	active?: boolean;
	size: GiftSizesType;
	onClick(): void;

	slug: string;
	title: string;
	price: number;
	withdrawable: boolean;
	className?: string;
};

export const SelectableItemGift = (props: SelectableItemGiftProps) => {
	const { slug, title, price, size, active, onClick, className, withdrawable } =
		props;

	// Извлекаем все цифры из slug
	const id = slug?.match(/\d+/)?.[0] || "0";

	return (
		<button
			onClick={onClick}
			className={clsx(
				className,
				GIFT_SIZES[size].card,
				!active && "bg-dark-blue-1300 border-white/40",
				active && "bg-dark-blue-1350 border-blue-100",
				"text-white rounded-2xl overflow-hidden relative border",
			)}
		>
			<div className="relative">
				{withdrawable ? (
					<LoadableLottie slug={slug}>
						{(animation) => (
							<TouchableLottie
								animation={animation}
								className="aspect-square rounded-lg overflow-hidden"
							/>
						)}
					</LoadableLottie>
				) : (
					<img
						src={`/assets/images/main/pepe_heart.webp`}
						className={clsx(
							className,
							// GIFT_SIZES[size].card,
							"rounded-t-[14px] rounded-b-[8px] z-0 bg-[#5B5B5B]",
						)}
					/>
				)}

				<Checkbox
					readOnly
					checked={active}
					variant="bordered"
					wrapperClassName="absolute top-2.5 left-2.5"
				/>
			</div>
			<div className="p-2">
				<header
					className={clsx(
						GIFT_SIZES[size].title,
						GIFT_SIZES[size].header,
						"flex items-center justify-between",
					)}
				>
					<h5>{title}</h5>
					<p>#{id}</p>
				</header>
				<div
					className={clsx(
						GIFT_SIZES[size].button,
						"border border-white/8 bg-white/10 backdrop-blur-[1.25rem] flex items-center justify-center gap-1 font-bold",
					)}
				>
					<span>{price}</span>
					<div className="grid place-content-center rounded-full bg-blue-250">
						<Icons name="ton" className="size-4.5" />
					</div>
				</div>
			</div>
		</button>
	);
};
