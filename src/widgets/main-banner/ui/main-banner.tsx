import type { Quest, QuestUser } from "@/shared/api/graphql/graphql";
import { Icons } from "@/shared/ui/icons/icons";

// Custom hook for countdown timer

export const MainBanner = ({
	onOpenModal,
	quests,
	questUser,
	countdownTime,
}: {
	onOpenModal: () => void;
	quests: Quest[];
	questUser: QuestUser[];
	countdownTime: string;
	claimReward: () => void;
}) => {
	const currentQuest = quests[0];
	const currentQuestUser = questUser?.[0];

	// const {
	// 	claimReward,
	// 	loading: claimRewardLoading,
	// 	error: claimRewardError,
	// } = useClaimReward();
	return (
		<article
			className="relative text-white mb-8 mx-4 rounded-[16px] border border-[#FFFFFF33] overflow-hidden"
			style={{
				background:
					"linear-gradient(90deg, #5B5B5B70 0%, #B0B0B070 100%), linear-gradient(270deg, #526C8A70 10%, #2E3D4B70 100%)",
			}}
		>
			<div className="overflow-hidden relative flex flex-col p-4">
				<div className="max-w-56 relative">
					<h2 className="text-lg/5 font-bold mb-1.5 text-[18px]">
						{"Бесплатный подарок 🎁"}
					</h2>
					<p className="font-regular mb-2 text-[12px]">
						Подпишитесь на {currentQuest?.requirements?.channelId} и получи Пепу
					</p>
				</div>
				<div className="flex items-center gap-2">
					<div
						// onClick={() => {
						// 	tg.openTelegramLink("https://t.me/labs_relayer");
						// }}
						className="border border-[#FFFFFF33] rounded-[8px] text-[12px] font-regular bg-[#FFFFFFB2] w-fit p-1  flex items-center"
					>
						{countdownTime != "00:00:00" && (
							<div className="flex items-center gap-1 mr-2 ml-2">
								<Icons name="clock" className="w-[18px] h-[18px] text-black" />
								<p className="text-[18px] font-bold text-black">
									{countdownTime}
								</p>
							</div>
						)}
						{!currentQuestUser?.completed && (
							<button
								onClick={onOpenModal}
								className="rounded-[8px] w-[78px] border-none outline-none h-[32px]"
								style={{
									background:
										"linear-gradient(360deg, #2D83EC 0%, #1AC9FF 100%)",
								}}
							>
								<p className="text-[14px] font-bold">ЗАБРАТЬ</p>
							</button>
						)}
					</div>
					{currentQuestUser?.completed && (
						<p className="text-[12px] text-[#A8A8A8]">УЖЕ ЗАБРАЛ</p>
					)}
				</div>
			</div>
			<img
				alt="telegram cap"
				src={"assets/images/main/pepe_heart.webp"}
				className="w-42 h-42 absolute top-1/2 -right-4 mt-2 -mr-2 -translate-y-1/2 rotate-[10deg] drop-shadow-[0_0_20px_#8A97B2FF] drop-shadow-[0_0_30px_#9EADC3FF] drop-shadow-[0_0_40px_#FFFFFFFF]"
			/>
		</article>
	);
};
