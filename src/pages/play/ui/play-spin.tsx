import {
	GIFT_RELAYER_LINK,
	GIFT_RELAYER_TEXT,
	useGetGifts,
} from "@/entities/gift";
import { SelectableItemGift } from "@/entities/gift/ui/selectable-item-gift";
import {
	useAddGiftsToLobby,
	useGetLobby,
	useJoinToLobby,
} from "@/entities/lobby";
import { useProfileContext } from "@/entities/profile";
import { SpinWheelContainer } from "@/features/spin-wheel";
import { BottomButton } from "@/shared/components/bottom-button/bottom-button";
import { LoadableLottie } from "@/shared/components/lottie/loadable-lottie";
import { TouchableLottie } from "@/shared/components/lottie/touchable-lottie";
import { useToast } from "@/shared/hooks/use-toast";
import { SafeAvatar } from "@/shared/ui/avatar/safe-avatar";
import { Icons } from "@/shared/ui/icons/icons";
import { Tabs, type TabsImperativeRef } from "@/shared/ui/tabs/tabs";
import { shareURL } from "@telegram-apps/sdk-react";
import clsx from "clsx";
import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const PlaySpin = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const lobbyParamId = Number(id);
	const { profile } = useProfileContext();
	const { joinToLobby, loading } = useJoinToLobby();
	const { addGiftsToLobby, loading: isLoadingAddGiftsToLobby } =
		useAddGiftsToLobby();
	const {
		lobby,
		refetch: refetchLobby,
		loading: isLoadingLobby,
	} = useGetLobby(lobbyParamId);
	const {
		gifts,
		refetch: refetchGifts,
		loading: isLoadingGifts,
	} = useGetGifts({
		take: 25,
		skip: 0,
		blocked: false,
	});
	const { showError } = useToast();
	const [giftsId, setGiftsId] = useState<string[]>([]);
	const tabsRef = useRef<TabsImperativeRef | null>(null);

	function isTelegramWebApp() {
		return typeof window !== "undefined" && !!window.Telegram?.WebApp;
	}

	function canVibrate() {
		return (
			typeof window !== "undefined" &&
			"vibrate" in window.navigator &&
			typeof window.navigator.vibrate === "function"
		);
	}

	const onErrorJoinToLobby = useCallback(
		async (text: string) => {
			// Показываем toast уведомление
			showError(text);

			// Вибрация через Telegram WebApp
			if (isTelegramWebApp() && window.Telegram.WebApp.HapticFeedback) {
				window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
			} else if (canVibrate()) {
				// Fallback: обычная вибрация для браузера
				window.navigator.vibrate(100);
			}
		},
		[showError],
	);

	const handleGoToAllLobbies = () => {
		navigate("/");
	};

	const handleSelectSpinResult = (winnerId: string) => {
		navigate(`/spin/${lobbyParamId}/result/${winnerId}`, {
			replace: true,
			state: {
				lobby,
			},
		});
	};

	const handleSelectGift = (giftId: string, isActive: boolean) => {
		if (isActive) {
			setGiftsId((prev) => prev.filter((id) => id !== giftId));
		} else {
			setGiftsId((prev) => [...prev, giftId]);
		}
	};

	// const handleToggleModal = () => {
	//   setIsOspenModal((prev) => !prev);
	// };

	const selectedGifts = useMemo(
		() => gifts.filter((gift) => giftsId.includes(gift.id)),
		[gifts, giftsId],
	);

	const currentUserBetting = lobby?.participants.find(
		(participant) => participant.userId === profile?.id,
	);

	const isAlreadyBetting = Boolean(currentUserBetting);

	const handleJoinToLobby = () => {
		if (isAlreadyBetting) {
			addGiftsToLobby(currentUserBetting!.id, giftsId).then(() => {
				tabsRef.current?.onForceTab(1);
				refetchLobby();
				refetchGifts();
			});
		} else {
			joinToLobby(lobbyParamId, giftsId).then(() => {
				tabsRef.current?.onForceTab(1);
				refetchLobby();
				refetchGifts();
			});
		}

		setGiftsId([]);
	};

	const handleShareLinkToGame = () => {
		shareURL(
			`https://t.me/test_fight_gifts_bot/app?startapp=${profile.referralCode}&${lobby?.id}`,
		);
	};

	const handleCheckBeforeBetting = () => {
		const totalPrice = selectedGifts.reduce((acc, gift) => acc + gift.price, 0);
		if (lobby?.minBet && totalPrice < lobby.minBet) {
			console.log("<");
			onErrorJoinToLobby(
				`Стоимость подарков должна быть не меньше ${lobby.minBet} TON`,
			);
			return;
		}
		if (lobby?.maxBet && totalPrice > lobby.maxBet) {
			console.log(">");
			onErrorJoinToLobby(
				`Стоимость подарков должна быть не больше ${lobby.maxBet} TON`,
			);
			return;
		}
		handleJoinToLobby();
	};

	const filteredBlockedGifts = useMemo(
		() => gifts.filter((gift) => gift.blocked === false),
		[gifts],
	);

	const totalAmount = useMemo(
		() =>
			lobby?.participants.reduce(
				(acc, participant) => acc + participant.amount,
				0,
			) || 0,
		[lobby?.participants],
	);

	const totalCountGifts = useMemo(
		() =>
			lobby?.participants.reduce(
				(acc, participant) => acc + participant.gifts.length,
				0,
			) || 0,
		[lobby?.participants],
	);

	const totalPriceSelectedGifts = useMemo(
		() => selectedGifts.reduce((acc, gift) => acc + gift.price, 0),
		[selectedGifts],
	);

	const winRate = useMemo(() => {
		if (totalAmount === 0) return 0;
		return ((currentUserBetting?.amount || 0) / totalAmount) * 100;
	}, [totalAmount, currentUserBetting?.amount]);

	return (
		<div className="py-2.5 px-4">
			<h1 className="text-2xl font-bold text-white mb-4 text-center">
				{lobby?.title || "----"}
			</h1>
			<header className="grid grid-cols-[92px_155px_auto]  gap-3 mb-7">
				<button
					onClick={handleGoToAllLobbies}
					className="bg-white/10 text-xs rounded-lg cursor-pointer px-2 min-h-10 flex items-center gap-1"
				>
					<Icons className="size-4" name="chevron-left" />
					<span>Все лобби</span>
				</button>
				<div className="bg-white/10 rounded-lg p-2 text-center justify-self-stretch">
					<div className="text-eight">ТЕКУЩАЯ СТАВКА</div>
					<div className="flex items-center justify-center text-xs text-blue-100 font-bold gap-1">
						<span>{totalCountGifts} гифтов</span>
						<div className="h-3.5 w-0.5 basis-0.5 shrink-0 bg-gray-200" />
						<span>{totalAmount.toFixed(0)} TON</span>
					</div>
				</div>
				<div className="grid grid-cols-[40px] auto-rows-[40px] gap-2 justify-self-end">
					<button
						onClick={handleShareLinkToGame}
						className="grid place-content-center cursor-pointer rounded-lg bg-white/10"
					>
						<Icons className="size-4" name="share" />
					</button>
				</div>
			</header>
			<div className="mb-6">
				{lobby && (
					<SpinWheelContainer
						lobby={lobby}
						onSelected={handleSelectSpinResult}
						onRefetchLobby={() => refetchLobby()}
						onRefreshAfterJoining={() => {
							refetchLobby();
							refetchGifts();
						}}
					/>
				)}
			</div>

			<div className="mb-4 text-base text-center">
				Шанс на победу:{" "}
				<span className="font-bold text-blue-100">{winRate.toFixed(2)}%</span>
			</div>

			<div className="mb-5 grid gap-4">
				{/* {filteredBlockedGifts.length === 0 && (
          <BottomButton
            disabled
            className="w-full"
            variant="secondary"
            content="Добавьте гифты"
          />
        )} */}
				{!isAlreadyBetting && (
					<BottomButton
						withShadow
						variant="primary"
						className="w-full"
						content={
							<>
								{loading || isLoadingAddGiftsToLobby ? (
									<Icons className="mx-auto animate-spin" name="loader" />
								) : (
									<>
										{selectedGifts.length === 0
											? "Сделать ставку"
											: `Сделать ставку ${totalPriceSelectedGifts.toFixed(
													2,
											  )} TON`}
									</>
								)}
							</>
						}
						onClick={handleCheckBeforeBetting}
						disabled={selectedGifts.length === 0}
					/>
				)}
				{isAlreadyBetting && (
					<BottomButton
						className="w-full"
						variant="secondary"
						disabled={selectedGifts.length === 0}
						onClick={handleCheckBeforeBetting}
						content={
							<>
								{loading || isLoadingAddGiftsToLobby ? (
									<Icons className="mx-auto animate-spin" name="loader" />
								) : (
									<>
										Ставка сделана {currentUserBetting?.amount}{" "}
										<span className="text-blue-100">
											{totalPriceSelectedGifts
												? "+ " + totalPriceSelectedGifts.toFixed(2)
												: ""}{" "}
										</span>
										<span
											className={clsx(
												totalPriceSelectedGifts && "text-blue-100",
											)}
										>
											TON
										</span>
									</>
								)}
							</>
						}
					/>
				)}
				<button
					type="button"
					onClick={handleShareLinkToGame}
					className="min-h-13.5 w-full rounded-2xl font-bold border border-blue-100 cursor-pointer text-blue-100 flex items-center gap-2.5 justify-center"
				>
					<Icons name="swords" className="size-6 text-blue-100" />
					<span className="font-medium text-lg/5">Пригласить друзей</span>
				</button>
			</div>

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
								У вас нет доступных gift’s <br /> для начала игры. <br />{" "}
								Отправь NFT подарок{" "}
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
											<span>{participant.amount}</span>
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

			{/* <Modal open={isOpenModal} onClose={handleToggleModal}>
        <p className="text-lg font-medium mb-7.5 text-center mt-2 mx-2">
          Вы хотите сделать ставку ? После подтверждения ее нельзя будет
          отменить !
        </p>
        <div className="grid grid-cols-2 gap-2 text-base">
          <button
            type="button"
            onClick={handleToggleModal}
            className="cursor-pointer min-h-12 grid place-content-center border border-white/30 rounded-2xl">
            Не буду ставить
          </button>

          <button
            type="button"
            onClick={handleJoinToLobby}
            className={clsx(
              'shadow-[0px_0px_19.6px_0px_--alpha(var(--color-blue-200)_/_50%)]',
              'min-h-12 rounded-2xl bg-linear-360 from-blue-50 from-0% to-blue-100 to-100% cursor-pointer text-white',
              'disabled:bg-dark-blue-700 disabled:text-white/50 disabled:shadow-none disabled:bg-linear-[none] disabled:cursor-not-allowed',
            )}>
            {loading || isLoadingAddGiftsToLobby ? (
              <Icons className="mx-auto animate-spin" name="loader" />
            ) : (
              'Сделать ставку'
            )}
          </button>
        </div>
      </Modal> */}
		</div>
	);
};

const tabs = ["Ваши Gift's", "Текущие ставки"];
