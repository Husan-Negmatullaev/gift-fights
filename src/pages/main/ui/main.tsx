import { lobbyImagesByBets, useGetLobbies } from "@/entities/lobby";
import {
	useClaimReward,
	useGetQuests,
	useGetQuestUsers,
} from "@/entities/quest";

import { useTelegram } from "@/entities/telegram";
import { LobbyStatus, type QuestUser } from "@/shared/api/graphql/graphql";
import { BottomButton } from "@/shared/components/bottom-button/bottom-button";
import { LoadingSpinner } from "@/shared/components/loading-spinner/loading-spinner";
import { useToast } from "@/shared/hooks/use-toast";
import { Icons } from "@/shared/ui/icons/icons";
import { Modal } from "@/shared/ui/modal/modal";
import { LiveWinners } from "@/widgets/live-winners";
import { MainBanner } from "@/widgets/main-banner";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function getLobbyBetKey(
	minBet: number | null,
	maxBet: number | null,
): Record<"background" | "image" | "gradient", string> {
	if (minBet === 50 && maxBet === null) {
		return {
			image: "/assets/images/main/epic-chest-of-tons.webp",
			background: "/assets/images/play/octopus.webp",
			gradient:
				"linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(90deg, #9C1846 0%, #E83662 100%)",
		};
	}
	if (minBet === null || maxBet === null) {
		return {
			image: "/assets/images/main/infinite-cube.webp",
			background: "/assets/images/play/octopus.webp",
			gradient:
				"linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(90deg, #30220E 0%, #70654E 100%)",
		};
	}

	return lobbyImagesByBets[`min_${minBet}_max_${maxBet}`];
}

export const Main = () => {
	const [open, setOpen] = useState(false);
	const [subscribeClicked, setSubscribeClicked] = useState(false);
	const { lobbies, loading } = useGetLobbies(15, 0, [
		LobbyStatus.Countdown,
		LobbyStatus.InProcess,
		LobbyStatus.WaitingForPlayers,
	]);
	const { quests } = useGetQuests({ take: 10, skip: 0 });
	const { questUsers } = useGetQuestUsers({ take: 1, skip: 0 });
	const { claimReward } = useClaimReward();

	// Helper function to remove @ symbol from channelId
	const getCleanChannelId = (channelId: string | null | undefined) => {
		if (!channelId) return "";
		return channelId.replace(/^@/, "");
	};

	const handleToggleModal = () => {
		setSubscribeClicked(false);
		setOpen((prev) => !prev);
	};
	if (loading) {
		return (
			<div className="grid place-content-center h-full">
				<LoadingSpinner />
			</div>
		);
	}
	const tg = useTelegram();
	const useCountdownTimer = (lastReset: string | null | undefined) => {
		const [timeLeft, setTimeLeft] = useState<string>("00:00:00");

		useEffect(() => {
			if (!lastReset) {
				setTimeLeft("00:00:00");
				return;
			}

			const calculateTimeLeft = () => {
				const now = new Date().getTime();
				const resetTime = new Date(lastReset).getTime();

				// Assuming the quest resets every 24 hours (86400000 ms)
				const resetInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
				const nextReset = resetTime + resetInterval;
				const difference = nextReset - now;

				if (difference <= 0) {
					setTimeLeft("00:00:00");
					return;
				}

				const hours = Math.floor(difference / (1000 * 60 * 60));
				const minutes = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60),
				);
				const seconds = Math.floor((difference % (1000 * 60)) / 1000);

				const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
					.toString()
					.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
				setTimeLeft(formattedTime);
			};

			// Calculate immediately
			calculateTimeLeft();

			// Update every second
			const interval = setInterval(calculateTimeLeft, 1000);

			return () => clearInterval(interval);
		}, [lastReset]);

		return timeLeft;
	};
	const countdownTime = useCountdownTimer(questUsers?.[0]?.completedAt);
	const { showError, showSuccess } = useToast();
	return (
		<div>
			<LiveWinners />
			<MainBanner
				onOpenModal={handleToggleModal}
				quests={quests}
				questUser={questUsers as QuestUser[]}
				countdownTime={countdownTime}
			/>
			<div className="px-6 mb-4">
				<p className="font-bold text-[24px]">Лобби</p>
				<p className="text-[#A8A8A8] text-[16px] font-regular">
					Делайте ставки, выигрывайте, но не превышайте сумму ставки
				</p>
			</div>
			<div className="px-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-9 content-start">
				{lobbies.map((lobby) => {
					const images = getLobbyBetKey(
						lobby.minBet ?? null,
						lobby.maxBet ?? null,
					);

					const isAllBetsNullable =
						lobby.minBet === null && lobby.maxBet === null;

					return (
						<Link to={`/spin/${lobby.id}`} className="block" key={lobby.id}>
							<article className="relative overflow-hidden rounded-2xl">
								<div
									className={`overflow-hidden relative min-h-43.5 grid p-4 rounded-2xl`}
									style={{
										background: images.gradient,
									}}
								>
									<div className="max-w-48 relative z-2">
										<h2 className="text-lg/5 font-medium mb-1.5">
											{lobby.title}
										</h2>
										{isAllBetsNullable ? (
											<div className="bg-white text-black px-2 py-1 text-sm font-bold rounded-lg w-fit">
												∞ TON
											</div>
										) : (
											<div className="bg-white text-black px-2 py-1 text-sm font-bold rounded-lg w-fit">
												{lobby.minBet} TON - {lobby.maxBet} TON
											</div>
										)}
									</div>
								</div>
								<img
									alt="telegram cap"
									src={images.image}
									className="pointer-events-none absolute bottom-0 right-0 z-0 w-full h-full object-cover"
								/>
							</article>
						</Link>
					);
				})}
			</div>
			<Modal open={open} onClose={handleToggleModal}>
				<div className="mb-3 mt-4 text-center px-3 flex flex-col items-center">
					<h2 className="mb-2 font-medium text-lg/4.5">
						Бесплатный подарок 🎁
					</h2>
					<p className="text-[#A8A8A8]">
						Подпишитесь на наш канал{" "}
						<a
							href={`https://t.me/${getCleanChannelId(
								quests[0]?.requirements?.channelId,
							)}`}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#1AC9FF] underline"
						>
							{quests[0]?.requirements?.channelId}
						</a>
						, чтобы получить подарок. Подарок нельзя вывести. Можно использовать
						в прокрутах — исчезает после применения.
					</p>
					<div className="flex justify-center bg-[#95A5C131] w-26.5 h-26.5 rounded-2xl items-center border border-[#A0ADC370] border-[1px] overflow-hidden mt-6">
						<img
							src="/assets/images/main/pepe_heart.webp"
							className="w-28 h-28 drop-shadow-[0_0_10px_#8A97B2FF]"
						/>
					</div>
					<p className="text-[#A8A8A8] text-xs mt-2 mb-6">{"0.5 TON"}</p>
					{countdownTime != "00:00:00" && (
						<button className="bg-[#FFCA38] text-black text-sm font-bold px-2 py-1 rounded-lg flex items-center gap-2 mb-4">
							<Icons
								name="clock"
								className="w-[10px] h-[10px] text-[#1D1D1D]"
							/>
							{countdownTime}
						</button>
					)}

					<BottomButton
						withShadow
						content={
							subscribeClicked || questUsers?.[0]?.completed
								? "Забрать"
								: "Подписаться"
						}
						className="px-4 mt-4 w-full"
						onClick={() => {
							if (!subscribeClicked) {
								setSubscribeClicked(true);
								tg.openTelegramLink(
									`https://t.me/${getCleanChannelId(
										quests[0]?.requirements?.channelId,
									)}`,
								);
							} else {
								claimReward(quests[0]?.id)
									.then((res) => {
										setSubscribeClicked(false);
										showSuccess("Подарок получен!");
										handleToggleModal();
										console.log("RES: ", res);
									})
									.catch((err) => {
										if (err.message == "Quest not completed") {
											setSubscribeClicked(false);
											showError("Условия не выполнены!");
										}
									});
							}
						}}
						// onClick={handleSubmit((penis) => penis.gifts)}
					/>
				</div>
			</Modal>
			{/* <Link to="/spin" className="block">
				<article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
					<div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
						<img
							alt="octopus"
							src="/assets/images/play/octopus.webp"
							className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
						/>
						<div className="max-w-48 relative">
							<h2 className="text-lg/5 font-medium mb-1.5">Прокрут Бомжа</h2>
							<p className="text-tiny mb-2">
								Делайте ставки, выигрывайте, но не превышайте сумму ставки:
							</p>
							<div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
								<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
									0.1 TON
								</div>
								-
								<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
									1 TON
								</div>
							</div>
						</div>
					</div>
					<img
						alt="telegram cap"
						src="/assets/images/main/bag-of-tons.webp"
						className="pointer-events-none h-32 absolute -top-3 right-2 scale-160 drop-shadow-[0px_0px_1.27px_0px_#6BCEFF,0px_0px_1.27px_0px_#6BCEFF,0px_0px_4.44px_0px_#6BCEFF,0px_0px_8.87px_0px_#6BCEFF,0px_0px_15.21px_0px_#6BCEFF,0px_0px_26.61px_0px_#6BCEFF]"
					/>
				</article>
			</Link>
			<Link to="/spin" className="block">
				<article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
					<div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
						<img
							alt="octopus"
							src="/assets/images/play/octopus.webp"
							className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
						/>
						<div className="max-w-48 relative">
							<h2 className="text-lg/5 font-medium mb-1.5">Прокрут Новичка</h2>
							<p className="text-tiny mb-2">
								Делайте ставки, выигрывайте, но не превышайте сумму ставки:
							</p>
							<div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
								<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
									1 TON
								</div>
								-
								<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
									5 TON
								</div>
							</div>
						</div>
					</div>
					<img
						alt="telegram cap"
						src="/assets/images/main/chest-of-tons.webp"
						className="pointer-events-none h-32 absolute -top-3 right-5 scale-170"
					/>
				</article>
			</Link>
			<Link to="/spin" className="block">
				<article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
					<div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
						<img
							alt="octopus"
							src="/assets/images/play/octopus.webp"
							className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
						/>
						<div className="max-w-48 relative">
							<h2 className="text-lg/5 font-medium mb-1.5">
								Прокрут Инвестора
							</h2>
							<p className="text-tiny mb-2">
								Делайте ставки, выигрывайте, но не превышайте сумму ставки:
							</p>
							<div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
								<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
									5 TON
								</div>
								-
								<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
									20 TON
								</div>
							</div>
						</div>
					</div>
					<img
						alt="telegram cap"
						src="/assets/images/main/handbag-of-tons.webp"
						className="pointer-events-none h-32 absolute -top-3 right-2 scale-170"
					/>
				</article>
			</Link>
			<Link to="/spin" className="block">
				{" "}
				<article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
					<div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
						<img
							alt="octopus"
							src="/assets/images/play/octopus.webp"
							className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
						/>
						<div className="max-w-48 relative">
							<h2 className="text-lg/5 font-medium mb-1.5">Прокрут Удачи</h2>
							<p className="text-tiny mb-2">
								Делайте ставки, выигрывайте, но не превышайте сумму ставки:
							</p>
							<div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
								<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
									20 TON
								</div>
								-
								<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
									50 TON
								</div>
							</div>
						</div>
					</div>
					<img
						alt="telegram cap"
						src="/assets/images/main/lucky-chest-of-tons.webp"
						className="pointer-events-none h-32 absolute -top-3 right-2 scale-160"
					/>
				</article>
			</Link>
			<Link to="/spin" className="block">
				<article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
					<div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
						<img
							alt="octopus"
							src="/assets/images/play/octopus.webp"
							className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
						/>
						<div className="max-w-48 relative">
							<h2 className="text-lg/5 font-medium mb-1.5">
								Эпический прокрут
							</h2>
							<p className="text-tiny mb-2">
								Делайте ставки, выигрывайте, но не превышайте сумму ставки:
							</p>
							<div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
								<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
									50 TON
								</div>
								-
								<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
									100 TON
								</div>
							</div>
						</div>
					</div>
					<img
						alt="telegram cap"
						src="/assets/images/main/epic-chest-of-tons.webp"
						className="pointer-events-none h-32 absolute -top-2 right-2 scale-160"
					/>
				</article>
			</Link>
			<Link to="/spin" className="block">
				<article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2.5xl text-white">
					<div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 min-h-30.5 grid items-center px-4.5 rounded-2.5xl">
						<img
							alt="octopus"
							src="/assets/images/play/octopus.webp"
							className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
						/>
						<div className="max-w-48 relative">
							<h2 className="text-lg/5 font-medium mb-1.5">
								Безлимитный прокрут
							</h2>
							<p className="text-tiny mb-2">
								Делайте ставки, выигрывайте, но не превышайте сумму ставки:
							</p>
							<div className="grid grid-cols-[1fr_auto_1fr] text-blue-250">
								<div className="grid place-content-center bg-white text-blue px-4 min-h-7.5 text-xs font-semibold rounded-2.5">
									∞ TON
								</div>
							</div>
						</div>
					</div>
					<img
						alt="telegram cap"
						src="/assets/images/main/infinite-cube.webp"
						className="pointer-events-none h-32 absolute -top-2 right-2 scale-160"
					/>
				</article>
			</Link> */}
		</div>
	);
};
