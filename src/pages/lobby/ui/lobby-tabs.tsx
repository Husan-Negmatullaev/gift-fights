import {
	GIFT_RELAYER_LINK,
	GIFT_RELAYER_TEXT,
	SelectableItemGift,
} from "@/entities/gift";
import type {
	GetGiftsQuery,
	GetLobbyQuery,
} from "@/shared/api/graphql/graphql";
import { LoadableLottie } from "@/shared/components/lottie/loadable-lottie";
import { TouchableLottie } from "@/shared/components/lottie/touchable-lottie";
import { SafeAvatar } from "@/shared/ui/avatar/safe-avatar";
import { Tabs, type TabsImperativeRef } from "@/shared/ui/tabs/tabs";
import { useMemo } from "react";

type LobbyTabsProps = {
	giftsId: string[];
	totalAmount: number;
	isLoadingGifts: boolean;
	isLoadingLobby: boolean;
	gifts: GetGiftsQuery["gifts"];
	lobby?: GetLobbyQuery["lobby"];
	tabsRef: React.RefObject<TabsImperativeRef | null>;
	handleSelectGift: (giftId: string, isActive: boolean) => void;
};

export const LobbyTabs = (props: LobbyTabsProps) => {
	const {
		lobby,
		gifts,
		tabsRef,
		giftsId,
		totalAmount,
		isLoadingGifts,
		isLoadingLobby,
		handleSelectGift,
	} = props;

	const filteredBlockedGifts = useMemo(
		() => gifts.filter((gift) => gift.blocked === false),
		[gifts],
	);

	return (
		<Tabs tabs={tabs} listClassName="mb-3" tabsRef={tabsRef}>
			<div>
				{isLoadingGifts && (
					<div className="grid grid-cols-2 gap-3 peer">
						<div className="w-full h-13.5 bg-gray-300 rounded-2xl animate-pulse" />
						<div className="w-full h-13.5 bg-gray-300 rounded-2xl animate-pulse" />
					</div>
				)}
				<ul
					aria-hidden={isLoadingGifts}
					className="grid grid-cols-2 gap-3 peer aria-hidden:hidden"
				>
					{filteredBlockedGifts?.map((gift) => (
						<li key={gift.id}>
							<SelectableItemGift
								size={"lg"}
								className="w-full"
								slug={gift.slug}
								price={gift.price}
								title={gift.title}
								active={giftsId.includes(gift.id)}
								withdrawable={gift.withdrawable}
								onClick={() =>
									handleSelectGift(gift.id, giftsId.includes(gift.id))
								}
							/>
						</li>
					))}
				</ul>
				<div
					aria-hidden={isLoadingGifts}
					className="peer-empty:block py-3 hidden aria-hidden:hidden"
				>
					<div className="text-center">
						<img
							alt="chest"
							src="/assets/images/chest.webp"
							className="mx-auto max-w-25"
						/>

						<p className="text-base/6 text-gray-200 mb-2 max-w-80 mx-auto text-center">
							У вас нет доступных gift’s <br /> для начала игры. <br /> Отправь
							NFT подарок{" "}
							<a
								target="_blank"
								href={GIFT_RELAYER_LINK}
								rel="noopener noreferrer"
								className="text-blue-100 underline"
							>
								@{GIFT_RELAYER_TEXT}
							</a>
							,<br /> и начни битву.
						</p>
					</div>
				</div>
			</div>
			<div>
				{isLoadingLobby && (
					<div className="grid grid-cols-2 gap-3 peer">
						<div className="w-full h-13.5 bg-gray-300 rounded-2xl animate-pulse" />
						<div className="w-full h-13.5 bg-gray-300 rounded-2xl animate-pulse" />
					</div>
				)}
				<div
					aria-hidden={isLoadingLobby}
					className="grid gap-2 peer aria-hidden:hidden"
				>
					{lobby?.participants.map((participant) => (
						<div
							key={participant.id}
							className="bg-white/10 backdrop-blur-[1.25rem] border border-white/8 rounded-2.5xl overflow-hidden p-4"
						>
							<div className="flex items-center gap-3 mb-2">
								<SafeAvatar
									url={participant.user.image}
									className="border border-gray-100 size-10"
								/>
								<span className="text-base flex-1">
									{participant.user.username}
								</span>

								<div className="flex items-center gap-1.5">
									<div className="grid place-content-center items-center gap-1 grid-flow-col bg-blue-100 text-white rounded-four min-h-7 basis-14 text-base font-bold px-1">
										<span>{participant.amount.toFixed(2)}</span>
										<span>TON</span>
									</div>

									<div className="grid place-content-center items-center gap-1 grid-flow-col bg-blue-100 text-white rounded-four min-h-7 basis-14 text-base font-bold px-1">
										{Math.min(
											(participant.amount / totalAmount) * 100,
											100,
										).toFixed(2)}
										%
									</div>
								</div>
							</div>
							<div className="grid grid-flow-col auto-cols-[60px] gap-1.5 overflow-auto">
								{participant.gifts.map((gift) =>
									gift.withdrawable ? (
										<LoadableLottie key={gift.id} slug={gift.slug}>
											{(animationData) => (
												<TouchableLottie
													animation={animationData}
													className="rounded-four overflow-hidden border border-white/10"
												/>
											)}
										</LoadableLottie>
									) : (
										<img
											src={`/assets/images/main/pepe_heart.webp`}
											className="rounded-four overflow-hidden border border-white/10"
										/>
									),
								)}
							</div>
						</div>
					))}
				</div>

				<div
					aria-hidden={isLoadingLobby}
					className="peer-empty:block py-4 hidden aria-hidden:hidden text-center"
				>
					<p className="text-base/5 text-gray-200 mb-2">
						Ни одной ставки не сделано
					</p>
				</div>
			</div>
		</Tabs>
	);
};

const tabs = ["Ваши Gift's", "Текущие ставки"];
