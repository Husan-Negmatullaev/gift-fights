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
import { useEffect, useState } from "react";

type LeaderUsersProps = {
	leaders: GetLeaderboardQuery["leaderboard"];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeLastBackgroundLayers(lottieJson: any, count = 1) {
	if (!lottieJson?.layers || !Array.isArray(lottieJson?.layers)) {
		console.warn("layers is missing or not an array");
		return lottieJson;
	}

	lottieJson.layers = lottieJson.layers.slice(0, -count);
	return lottieJson;
}

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
				setTimeRemaining("00д 00ч 00м");
				return;
			}

			const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

			const formatTime = () => {
				const parts = [];
				if (days > 0) parts.push(`${days}д`);
				if (hours > 0) parts.push(`${hours}ч`);
				if (minutes > 0) parts.push(`${minutes}м`);
				return parts.join(" ") || "0м";
			};

			setTimeRemaining(formatTime());
		};

		updateTimer();
		const interval = setInterval(updateTimer, 60000); // Update every minute

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
		}
	> = {
		1: {
			leaderboard: leaders[0]?.user ?? null,
			reward: rewards?.find((reward) => reward.place === Place.First) ?? null,
			position: {
				top: "0px",
				left: 50,
			},
		},
		2: {
			reward: rewards?.find((reward) => reward.place === Place.Second) ?? null,
			leaderboard: leaders[1]?.user ?? null,
			position: {
				top: "45px",
				left: 0,
			},
		},
		3: {
			reward: rewards?.find((reward) => reward.place === Place.Third) ?? null,
			leaderboard: leaders[2]?.user ?? null,
			position: {
				top: "40px",
				left: 100,
			},
		},
	};

	return (
		<div className="bg-linear-360 from-blue-50 from-0% to-blue-100 to-100% py-4 px-6 rounded-b-3xl">
			<div className="flex mb-4.5 justify-between">
				<h1 className=" text-white font-semibold text-2xl">Таблица лидеров</h1>
				<div className="bg-[white] px-3 py-2 rounded-[10px]">
					<p className="text-[var(--color-blue-100)] text-[13px] font-bold">
						{timeRemaining}
					</p>
				</div>
			</div>
			<div className="min-h-50 max-w-89 mx-auto relative mb-4">
				{Object.entries(users)
					.sort(([a], [b]) => Number(a) - Number(b))
					.map(([index, leader]) => {
						return (
							<div
								key={index}
								className="absolute"
								style={{
									top: leader.position.top,
									left: `${leader.position.left}%`,
									transform: `translateX(-${leader.position.left}%)`,
								}}
							>
								<div className="h-20 w-20">
									<LoadableLottie slug={leader.reward?.slug ?? ""}>
										{(animation, loading) => {
											return loading ? (
												<div className="size-full" />
											) : (
												<AppLottie
													style={lottieSizes}
													animation={removeLastBackgroundLayers(animation)}
													className="absolute inset-0 object-cover"
												/>
											);
										}}
									</LoadableLottie>
								</div>

								<div className="grid place-items-center -mt-1 relative">
									<Avatar
										className="size-10.5 -mb-1.5 relative"
										url={leader.leaderboard?.image ?? ""}
									/>

									<div className=" text-tiny font-thin flex items-center bg-gray-50/30 border border-white/30 shadow-[0px_4px_4px_0px_--alpha(var(--color-black)_/_7%)] min-h-5.5 px-3 text-center rounded-full">
										{leader.leaderboard?.username ?? ""}
									</div>
								</div>
							</div>
						);
					})}
			</div>

			<div>
				<h6 className="text-eight font-medium px-2 mb-1">Твой ранг</h6>
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
			</div>
		</div>
	);
};

const lottieSizes = {
	width: 93 * 1.8,
	height: 80 * 1.8,
	left: -40,
	top: -25,
};
