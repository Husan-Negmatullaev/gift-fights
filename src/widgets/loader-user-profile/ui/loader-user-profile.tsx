import { useGetLobbies } from "@/entities/lobby";
import { useProfileContext } from "@/entities/profile";
import { useTelegram } from "@/entities/telegram";
import { LobbyStatus } from "@/shared/api/graphql/graphql";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type LoadUserProfileProps = {
	children: React.ReactNode;
};

export const LoadUserProfile = (props: LoadUserProfileProps) => {
	const { children } = props;
	const [progress, setProgress] = useState(0);
	const { isFirstLoadingTime } = useProfileContext();
	const isDataLoaded = isFirstLoadingTime;
	const [loadingText, setLoadingText] = useState("Инициализация...");
	const [_isComplete, setIsComplete] = useState(false);
	const [_currentStageIndex, setCurrentStageIndex] = useState(0);
	const [isShowLoading, setIsShowLoading] = useState(false);
	const [minProgress, setMinProgress] = useState(0);
	const navigate = useNavigate();
	const tg = useTelegram();
	const { lobbies, loading } = useGetLobbies(15, 0, [
		LobbyStatus.Countdown,
		LobbyStatus.InProcess,
		LobbyStatus.WaitingForPlayers,
	]);
	// Effect to handle the loading animation based on the boolean
	useEffect(() => {
		if (isDataLoaded) {
			// If data is loaded, complete the loading immediately
			setProgress(100);
			setLoadingText("Готово!");
			setIsComplete(true);

			// Hide loading screen after 200ms as requested
			setTimeout(() => {
				setIsShowLoading(true);
			}, 200);

			if (tg.initDataUnsafe.start_param) {
				const startParam = tg.initDataUnsafe.start_param;
				const lobbyTitle = startParam
					? startParam.split("=")[1] || startParam
					: "";
				let lobbyActualTitle = "";
				switch (lobbyTitle) {
					case "bezlimitniy":
						lobbyActualTitle = "Безлимитный спин";
						break;
					case "novichok":
						lobbyActualTitle = "Спин Новичка";
						break;
					case "investor":
						lobbyActualTitle = "Спин Инвестора";
						break;
					case "lucky":
						lobbyActualTitle = "Спин Удачи";
						break;
					case "epic":
						lobbyActualTitle = "Эпический спин";
						break;
					default:
						lobbyActualTitle = "";
						break;
				}
				const lobby = lobbies.find((lobby) => lobby.title === lobbyActualTitle);
				if (lobby) {
					navigate(`/spin/${lobby?.id}`);
				}
			}
			return;
		}

		// If data is not loaded, animate through the stages
		const animateLoading = async () => {
			const totalStages = loadingStages.length - 1; // Exclude the last "Готово!" stage

			for (let i = 0; i < totalStages && !isDataLoaded; i++) {
				setCurrentStageIndex(i);
				setLoadingText(loadingStages[i].text);

				// Calculate progress based on stage (ensuring it only goes forward)
				const baseProgress = (i / totalStages) * 85; // Go up to 85%
				const randomVariation = Math.random() * 5; // Add 0-5% variation
				const calculatedProgress = baseProgress + randomVariation;

				// Ensure progress never goes backwards
				const newProgress = Math.max(
					minProgress + 1,
					Math.min(90, calculatedProgress),
				);

				setProgress(newProgress);
				setMinProgress(newProgress); // Update minimum progress

				// Wait 200ms before next stage (if data still not loaded)
				await new Promise((res) => setTimeout(res, 200));

				// Check if data was loaded during the wait
				if (isDataLoaded) {
					break;
				}
			}

			// If we've gone through all stages but data still not loaded,
			// stay at the last stage with some progress animation
			if (!isDataLoaded) {
				setLoadingText("Ожидание данных...");
				// Keep progress between current progress and 95% while waiting
				const waitingAnimation = setInterval(() => {
					if (isDataLoaded) {
						clearInterval(waitingAnimation);
						return;
					}
					// Slowly increment progress while waiting, never going backwards
					setProgress((prev) => {
						const increment = Math.random() * 2; // Small random increment
						const newValue = Math.min(95, prev + increment);
						setMinProgress(newValue);
						return newValue;
					});
				}, 500);
			}
		};

		animateLoading();
	}, [isDataLoaded]);

	// If loading is complete and hidden, show the main app content
	// if (!showLoading) {
	//   return (
	//     <div className="relative w-[393px] h-[852px] bg-[#1d232a] mx-auto flex items-center justify-center">
	//       <div className="text-center">
	//         <h1 className="text-white text-2xl font-bold mb-4">
	//           Welcome to Gift Fights!
	//         </h1>
	//         <p className="text-white/70 text-lg">
	//           Loading complete. Ready to play!
	//         </p>
	//       </div>
	//     </div>
	//   );
	// }

	if (isShowLoading) return <>{children}</>;

	return (
		<main className="grid place-items-center place-content-center gap-12.5 bg-dark-blue-1450">
			<div>
				<img alt="gift fight logo" src="/assets/images/preloader.webp" />
			</div>
			<div>
				<div className="text-center  text-white text-2xl font-bold mb-3">
					{loadingText}
				</div>
				<div className="relative mb-3">
					<div className="relative w-50 h-6 mx-auto bg-dark-blue-1450 rounded-lg border-4 border-gray-250 overflow-hidden">
						<div
							style={{ width: `${progress}%` }}
							className="h-full bg-gradient-to-t from-blue-50 to-blue-100 rounded-four transition-all duration-200 ease-out relative"
						></div>
					</div>
				</div>
				<div className="text-gray-200 text-lg text-center leading-normal">
					{Math.round(progress)}%
				</div>
			</div>
		</main>
	);
};

const loadingStages = [
	{ text: "Инициализация..." },
	{ text: "Подключение к серверу..." },
	{ text: "Загрузка данных пользователя..." },
	{ text: "Синхронизация профиля..." },
	{ text: "Загрузка игровых данных..." },
	{ text: "Проверка обновлений..." },
	{ text: "Финализация..." },
	{ text: "Готово!" },
];
