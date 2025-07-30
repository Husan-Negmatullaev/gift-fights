import { useGetGifts } from "@/entities/gift";
import {
	useAddGiftsToLobby,
	useGetLobby,
	useJoinToLobby,
} from "@/entities/lobby";
import { useProfileContext } from "@/entities/profile";
import { BottomButton } from "@/shared/components/bottom-button/bottom-button";
import { useToast } from "@/shared/hooks/use-toast";
import { Icons } from "@/shared/ui/icons/icons";
import type { TabsImperativeRef } from "@/shared/ui/tabs/tabs";
import { WheelContainer } from "@/widgets/wheel-container";
import { shareURL } from "@telegram-apps/sdk-react";
import { clsx } from "clsx";
import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LobbyTabs } from "./lobby-tabs";

export const Lobby = () => {
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
			showError(text);

			if (isTelegramWebApp() && window.Telegram.WebApp.HapticFeedback) {
				window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
			} else if (canVibrate()) {
				window.navigator.vibrate(100);
			}
		},
		[showError],
	);

	const handleGoToAllLobbies = () => {
		navigate("/");
	};

	const handleSelectSpinResult = useCallback(
		(winnerId: string) => {
			navigate(`/spin/${lobbyParamId}/result/${winnerId}`, {
				replace: true,
				state: {
					lobby,
				},
			});
		},
		[lobby, lobbyParamId, navigate],
	);

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
		let shareTitle = "";
		switch (lobby?.title) {
			case "Безлимитный спин":
				shareTitle = "bezlimitniy";
				break;
			case "Спин Новичка":
				shareTitle = "novichok";
				break;
			case "Спин Инвестора":
				shareTitle = "investor";
				break;
			case "Спин Удачи":
				shareTitle = "lucky";
				break;
			case "Эпический спин":
				shareTitle = "epic";
				break;

			default:
				shareTitle = "";
				break;
		}
		shareURL(
			`https://t.me/test_fight_gifts_bot/app?startapp=${profile.referralCode}=${shareTitle}`,
			"🎮 Битва за гифты началась!\nСтавь 🎁, сражайся в реальном времени ⚔️ и забирай весь банк 💰.\nКаждая секунда решает — не тормози!",
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

	// const filteredBlockedGifts = useMemo(
	//   () => gifts.filter((gift) => gift.blocked === false),
	//   [gifts],
	// );

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
					<WheelContainer
						lobby={lobby}
						onWinner={handleSelectSpinResult}
						onAfterJoinToLobby={() => {
							refetchLobby();
						}}
					/>
				)}
			</div>

			<div className="mb-4 text-base text-center">
				Шанс на победу:{" "}
				<span className="font-bold text-blue-100">{winRate.toFixed(2)}%</span>
			</div>

			<div className="mb-5 grid gap-4">
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
										Ставка сделана {currentUserBetting?.amount.toFixed(2)}{" "}
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

			<LobbyTabs
				lobby={lobby}
				gifts={gifts}
				giftsId={giftsId}
				totalAmount={0}
				tabsRef={tabsRef}
				isLoadingGifts={isLoadingGifts}
				isLoadingLobby={isLoadingLobby}
				handleSelectGift={handleSelectGift}
			/>
		</div>
	);
};
