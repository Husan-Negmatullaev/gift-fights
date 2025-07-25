import {
	useGetLeaderboardInfo,
	useGetMySquare,
	useGetRewards,
} from "@/entities/leaderboards";
import { Place, type GetLeaderboardQuery } from "@/shared/api/graphql/graphql";
import { AppLottie } from "@/shared/components/lottie/app-lottie";
import { LoadableLottie } from "@/shared/components/lottie/loadable-lottie";
import { Avatar } from "@/shared/ui/avatar/avatar";
import { Icons } from "@/shared/ui/icons/icons";
import { useEffect, useMemo, useState } from "react";

type LeaderUsersProps = {
	leaders: GetLeaderboardQuery["leaderboard"];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeBackgroundLayers(lottieJson: any) {
	// Handle null, undefined, or invalid animation data
	if (!lottieJson || typeof lottieJson !== "object") {
		return lottieJson;
	}

	if (!lottieJson.layers || !Array.isArray(lottieJson.layers)) {
		// Only warn if we have a valid object but missing layers
		if (lottieJson && typeof lottieJson === "object") {
			console.warn("layers is missing or not an array in lottie animation");
		}
		return lottieJson;
	}

	// Background layer filtering logic
	const backgroundNames = [
		"Background",
		"bg",
		"background",
		"BG",
		"Back",
		"back",
		"Background 1",
		"Background 2",
		"bg 1",
		"bg 2",
		"Solid",
		"solid",
		"Color",
		"color",
	];

	const filteredLayers = lottieJson.layers.filter((layer: any) => {
		const hasBackgroundName = backgroundNames.some((name) =>
			layer.nm?.toLowerCase().includes(name.toLowerCase()),
		);
		const isSolidLayer = layer.ty === 1;
		const hasBackgroundProperties = layer.bg || layer.bgColor;
		const isBackgroundShape =
			layer.ty === 4 &&
			(layer.nm?.toLowerCase().includes("background") ||
				layer.nm?.toLowerCase().includes("bg"));

		return !(
			hasBackgroundName ||
			isSolidLayer ||
			hasBackgroundProperties ||
			isBackgroundShape
		);
	});

	// Create a copy to avoid mutating the original
	const modifiedJson = { ...lottieJson };
	modifiedJson.layers = filteredLayers;
	return modifiedJson;
}

// Separate component to handle processed animation with useMemo
const ProcessedLottieAnimation = ({ animation }: { animation: any }) => {
	const processedAnimation = useMemo(
		() => removeBackgroundLayers(animation),
		[animation],
	);

	return (
		<AppLottie
			style={lottieSizes}
			animation={processedAnimation}
			className="absolute inset-0 object-cover mx-4"
		/>
	);
};

const useLeaderboardTimer = (endDate: string | null) => {
	const [timeRemaining, setTimeRemaining] = useState<string>("");

	useEffect(() => {
		if (!endDate) {
			setTimeRemaining("");
			return;
		}

		const updateTimer = () => {
			const now = new Date().getTime();
			const end = new Date(endDate).getTime();
			const timeLeft = Math.max(0, end - now);

			if (timeLeft <= 0) {
				setTimeRemaining("0 дней 00:00:00");
				return;
			}

			const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

			const formatTime = () => {
				const daysText =
					days === 1 ? "день" : days >= 2 && days <= 4 ? "дня" : "дней";
				const formattedHours = hours.toString().padStart(2, "0");
				const formattedMinutes = minutes.toString().padStart(2, "0");
				const formattedSeconds = seconds.toString().padStart(2, "0");

				return `${days} ${daysText} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
			};

			setTimeRemaining(formatTime());
		};

		updateTimer();
		const interval = setInterval(updateTimer, 1000); // Update every second

		return () => clearInterval(interval);
	}, [endDate]);

	return timeRemaining;
};

export const LeaderUsers = (props: LeaderUsersProps) => {
	const { leaders } = props;

	const { data: myScore } = useGetMySquare();
	const { data: rewards } = useGetRewards();
	const { data: leaderboardInfo } = useGetLeaderboardInfo();

	const timeRemaining = useLeaderboardTimer(leaderboardInfo?.endDate);

	const users: Record<
		number,
		{
			reward: {
				__typename?: "Gift";
				id: string;
				slug: string;
				place?: Place | null;
			} | null;
			leaderboard: {
				username: string;
				__typename?: "User";
				image?: string | null;
			} | null;
			position: { top: string; left: number };
			score: number;
		}
	> = {
		1: {
			leaderboard: leaders[0]?.user ?? null,
			reward: rewards?.find((reward) => reward.place === Place.First) ?? null,
			position: {
				top: "0px",
				left: 50,
			},
			score: leaders[0]?.score ?? 0,
		},
		2: {
			reward: rewards?.find((reward) => reward.place === Place.Second) ?? null,
			leaderboard: leaders[1]?.user ?? null,
			position: {
				top: "40px",
				left: 0,
			},
			score: leaders[1]?.score ?? 0,
		},
		3: {
			reward: rewards?.find((reward) => reward.place === Place.Third) ?? null,
			leaderboard: leaders[2]?.user ?? null,
			position: {
				top: "80px",
				left: 100,
			},
			score: leaders[2]?.score ?? 0,
		},
	};

	return (
		<div className=" py-4 px-6 rounded-b-3xl">
			<div className="flex justify-between flex-col">
				<h1 className=" text-white font-semibold text-2xl">Лидеры битв</h1>
				<span className="text-[var(--color-blue-100)]  font-bold">
					<span className="font-[400] text-[#A8A8A8]">Обновление через:</span>{" "}
					{timeRemaining}
				</span>
			</div>
			<div className="min-h-60 max-w-89 mx-auto relative">
				{Object.entries(users)
					.sort(([a], [b]) => Number(a) - Number(b))
					.map(([index, leader]) => {
						const hasData = leader.leaderboard;
						return (
							<div
								key={index}
								className="absolute"
								style={{
									top: leader.position.top,
									left: `${leader.position.left}%`,
									transform: `translateX(-${leader.position.left}%)`,
									display: hasData ? "block" : "none",
								}}
							>
								<div className="h-20 w-20 mx-4">
									<LoadableLottie slug={leader.reward?.slug ?? ""}>
										{(animation, loading) => {
											return loading ? (
												<div className="size-full" />
											) : (
												<ProcessedLottieAnimation animation={animation} />
											);
										}}
									</LoadableLottie>
								</div>

								<div className="grid place-items-center -mt-1 relative gap-1  mx-4">
									<Avatar
										className="size-13 -mb-1.5 relative border border-[#494A4A]"
										url={leader.leaderboard?.image ?? ""}
									/>
									<p className="mt-1">{leader.leaderboard?.username ?? ""}</p>
									<div className="bg-[#FFFFFF1A] backdrop-blur-[20px] rounded-full px-2 py-1 flex items-center justify-center border border-[#FFFFFF14]">
										<span className="font-bold">{leader.score.toFixed(2)}</span>
										<div className="bg-[#0088CC] rounded-full w-[16px] h-[16px] flex items-center justify-center ml-2">
											<Icons name="ton" className="w-[14px] h-[14px]" />
										</div>
									</div>
								</div>
							</div>
						);
					})}
				<div className="absolute -bottom-28 flex items-end">
					<div className="flex flex-col">
						<img src="assets/images/0_1.png"></img>
						<img src="assets/images/1_1.png"></img>
					</div>
					<div className="flex flex-col ">
						<img src="assets/images/0_2.png"></img>
						<img src="assets/images/1_2.png"></img>
					</div>
					<div className="flex flex-col ">
						<img src="assets/images/0_3.png"></img>
						<img src="assets/images/1_3.png"></img>
					</div>
				</div>
			</div>
			<div className="backdrop-blur-[20px] min-h-10.5 flex items-center gap-2 justify-between rounded-2xl px-3 py-2 border border-[#0098EA] mt-30">
				<div className="flex items-center">
					<span className="text-[#A8A8A8] w-12 text-center">
						{myScore?.rank ? `#${myScore.rank}` : ""}
					</span>
					<img
						src={myScore?.user.image || "/assets/images/main/pepe_heart.webp"}
						onError={(e) => {
							e.currentTarget.src = "/assets/images/main/pepe_heart.webp";
						}}
						alt={myScore?.user.username}
						className="w-10 h-10 rounded-full border border-[#494A4A] mx-2"
					/>
					<span>{myScore?.user.username}</span>
					<span>(вы)</span>
				</div>

				<div className="flex items-center font-bold text-lg gap-2">
					<span>{myScore?.score?.toFixed(2)}</span>
					<div className="bg-[#0088CC] rounded-full w-[16px] h-[16px] flex items-center justify-center ml-[2px] ">
						<Icons name="ton" width={14} height={14} />
					</div>
				</div>
			</div>
			{/* <div>
				<div className="flex items-center justify-between bg-dark-blue-150 rounded-lg px-3 min-h-13">
					<div className="flex items-center gap-2">
						{myScore?.rank && <span>#{myScore?.rank}</span>}
						<span>{myScore?.user.username}</span>
					</div>

					<div className="text-sm font-medium flex items-center">
						<span>{myScore?.score?.toFixed(2) ?? 0}</span>
						<Icons name="ton" width={22} height={22} />
					</div>
				</div>
			</div> */}
		</div>
	);
};

const lottieSizes = {
	width: 93 * 1.8,
	height: 80 * 1.8,
	left: -40,
	top: -25,
};
