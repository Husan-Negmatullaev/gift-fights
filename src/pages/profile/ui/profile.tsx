import { GiftBorderCard } from "@/entities/gift";
import { useProfileContext } from "@/entities/profile";
import { ProfileInformation } from "@/entities/user";
import { ReferralBalanceOutput } from "@/features/refferal-balance-output";
import { useCopy } from "@/shared/hooks/use-copy";
import { RefStatItem } from "@/widgets/ref-stat-item";
import { useEffect, useState } from "react";
// import { shareURL } from '@telegram-apps/sdk-react';

type TabType = "profile" | "referrals";

export const Profile = () => {
	const { onCopy } = useCopy();
	const { profile, refetch } = useProfileContext();
	const gifts = profile?.gifts;
	// const { data: withdrawnGifts } = useGetWithdrawnGifts(15, 0);
	const [activeTab, setActiveTab] = useState<TabType>("profile");

	useEffect(() => {
		refetch();
	}, [refetch]);

	const handleTabChange = (tab: TabType) => {
		setActiveTab(tab);
	};

	return (
		<section className="grid gap-5 pb-7.5 ">
			<ProfileInformation profile={profile} />
			<div className="px-6 ">
				<div className="flex flex-col gap-7.5 -mt-4">
					<article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-2xl text-white overflow-hidden border border-[#FFFFFF33] shadow-[0px_0px_10px_4px_#2E5C7F]">
						<div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 p-4 rounded-2xl">
							<img
								alt="octopus"
								src="/assets/images/play/to-the-moon-rocket.webp"
								className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
							/>
							<h2 className="font-medium text-lg/5 max-w-50 mb-1.5">
								Зарабатывайте на приглашениях !
							</h2>
							<p className="max-w-53 font-thin text-sm mb-2.5">
								Получайте до 20% с выводов своих рефералов !
							</p>
							<div className="bg-[#11161B] flex items-center justify-between gap-4 relative rounded-2.5 p-1 z-1">
								<input
									readOnly
									value={profile.referralCode}
									className="px-3 font-medium text-xs w-full min-h-8.5 text-[#A8A8A8]"
								/>
								<button
									type="button"
									className="cursor-pointer bg-white rounded-2.5 min-h-8.5 px-4 text-black font-medium text-xs basis-25 shrink-0"
									onClick={() =>
										onCopy(
											`https://t.me/test_fight_gifts_bot/app?startapp=${profile.referralCode}`,
										)
									}
								>
									Скопировать
								</button>
							</div>
						</div>
						<img
							alt="telegram cap"
							className="pointer-events-none h-56.5 absolute -top-14 -right-14 transform rotate-15 drop-shadow-[0px_20px_20px_#8FC9FF]"
							src="/assets/images/profile/twenty-percent-off.webp"
						/>
					</article>
				</div>
				<div className="mb-2 mt-4">
					<div className="bg-dark-blue-50 rounded-full flex">
						<button
							type="button"
							onClick={() => handleTabChange("profile")}
							className={`flex-1 py-[10px] rounded-full font-regular  transition-all duration-200 ${
								activeTab === "profile"
									? "bg-[#FFFFFF33] backdrop-blur-[10px]"
									: ""
							}`}
						>
							Профиль
						</button>
						<button
							type="button"
							onClick={() => handleTabChange("referrals")}
							className={`flex-1 py-[10px] rounded-full font-regular  transition-all duration-200 ${
								activeTab === "referrals" ? "bg-[#FFFFFF33]" : ""
							}`}
						>
							Рефералы
						</button>
					</div>
				</div>

				{activeTab === "profile" && (
					<div className="scrollbar-hide mt-4">
						<div className="mb-3">
							<h2 className="text-lg font-bold mb-2">Статистика</h2>
							<dl className="grid grid-cols-3 gap-3">
								<div className="gradient-border">
									<div className="px-2 py-4 rounded-xl bg-dark-blue-50">
										<dt className="text-base text-center text-[#A8A8A8]">
											Побед
										</dt>
										<dd className="text-center text-green text-lg font-bold">
											{profile.wins}
										</dd>
									</div>
								</div>
								<div className="gradient-border">
									<div className="bg-dark-blue-50 px-2 py-4 rounded-xl">
										<dt className="text-base text-center text-[#A8A8A8]">
											Проигрышей
										</dt>
										<dd className="text-center text-red text-lg font-bold">
											{profile.losses}
										</dd>
									</div>
								</div>
								<div className="gradient-border">
									<div className="bg-dark-blue-50 px-2 py-4 rounded-xl">
										<dt className="text-base text-center text-[#A8A8A8]">
											Winrate (%)
										</dt>
										<dd className="text-center text-green text-lg font-bold">
											{profile.winRate ? Number(profile.winRate.toFixed(2)) : 0}
											%
										</dd>
									</div>
								</div>
							</dl>
						</div>

						<div className="mt-8">
							<h2 className="text-lg mb-2 font-bold">Последние выводы</h2>

							<ul className="flex flex-col gap-2 peer">
								{profile.withdrawnGifts.map((gift) => (
									// {mockWithdrawnGifts.map((gift) => (
									<li key={gift.giftId}>
										<GiftBorderCard
											size="lg"
											slug={
												gifts?.find((g) => g.id === gift.giftId)?.slug ?? ""
											}
											title={
												gifts?.find((g) => g.id === gift.giftId)?.title ?? ""
											}
											price={
												gifts?.find((g) => g.id === gift.giftId)?.price ?? 0
											}
											status={gift.status}
										/>
									</li>
								))}
							</ul>
							<div className="peer-empty:block hidden">
								<p className="text-center font-medium text-lg">Нет подарков</p>
							</div>
						</div>
					</div>
				)}
				{activeTab === "referrals" && (
					<>
						<ReferralBalanceOutput />
						<h2 className="text-lg font-bold mb-4">Статистика</h2>
						<div className="flex flex-col gap-3">
							<RefStatItem title="Друзья" value={profile.referrals.length} />
							<RefStatItem title="Ваш бонус" value={20} isPercent />
							{/* <RefStatItem title="Общий доход" value={0.0} isTon /> */}
						</div>
					</>
				)}
			</div>
		</section>
	);
};
