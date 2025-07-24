import { useProfileContext } from "@/entities/profile";
import { useCreateWithdrawBonus } from "@/entities/user";
import { useNavigationContext } from "@/shared/contexts/navigation-context";
import { useToast } from "@/shared/hooks/use-toast";
import { Icons } from "@/shared/ui/icons/icons";
import { Modal } from "@/shared/ui/modal/modal";
import { useCallback, useState } from "react";

export const ReferralBalanceOutput = () => {
	const { profile, refetch } = useProfileContext();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [withdrawAmount, setWithdrawAmount] = useState("");
	const { showSuccess, showError } = useToast();
	const { createWithdrawBonus, loading } = useCreateWithdrawBonus();
	const { hideNavBar, showNavBar } = useNavigationContext();

	const handleToggleModal = () => {
		setIsModalOpen((prev) => !prev);
	};

	const handleInputFocus = () => {
		hideNavBar();
		// Scroll down by 20px when input is focused with delay
		setTimeout(() => {
			window.scrollBy({
				top: 30,
				behavior: "smooth",
			});
		}, 200); // 300ms delay
	};

	const handleInputBlur = () => {
		showNavBar();
	};

	const handleCreateWithdrawBonus = () => {
		const amount = parseFloat(withdrawAmount) || 0;
		createWithdrawBonus({ amount })
			.then(() => {
				refetch();
				handleToggleModal();
				showSuccess("Вывод реф. баланса успешно создан");
			})
			.catch(() => {
				showError("Ошибка при выводе реф. баланса");
			});
	};

	const bonuses = profile.bonuses;

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

	const onErrorWithdraw = useCallback(async () => {
		console.log("onErrorWithdraw");
		// Показываем toast уведомление
		showError("Не хватает реф. баланса!");

		// Вибрация через Telegram WebApp
		if (isTelegramWebApp() && window.Telegram.WebApp.HapticFeedback) {
			window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
		} else if (canVibrate()) {
			// Fallback: обычная вибрация для браузера
			window.navigator.vibrate(100);
		}
	}, [showError]);

	return (
		<>
			<article className="relative text-white mb-6 mt-4">
				<div className="overflow-hidden relative">
					<h2 className="font-bold text-lg mb-4">Ваша награда</h2>
					<div className="flex items-center justify-between gap-4 relative rounded-[16px]">
						<input
							type="number"
							value={withdrawAmount}
							onChange={(e) => setWithdrawAmount(e.target.value)}
							onFocus={handleInputFocus}
							onBlur={handleInputBlur}
							className="p-4 w-full focus:outline-none focus:ring-0  rounded-[16px] border border-[#FFFFFF66]"
							placeholder="0.00 TON"
						/>
					</div>
					<div className="flex justify-between mt-1">
						<p className="text-sm text-[#A8A8A8]">Мин. сумма: {1} TON</p>
						<p className="text-sm text-white">Баланс: {profile.balance} TON</p>
					</div>
					<button
						type="button"
						// disabled={bonuses === 0}
						onClick={
							bonuses === 0 || parseFloat(withdrawAmount) > bonuses
								? onErrorWithdraw
								: handleToggleModal
						}
						className="disabled:cursor-not-allowed cursor-pointer px-4 font-bold text-lg basis-25 shrink-0 bg-white text-black rounded-[16px] w-full py-[10px] mt-4"
					>
						Вывести
					</button>
				</div>
			</article>

			<Modal
				open={isModalOpen}
				onClose={handleToggleModal}
				contentClassName="text-center"
			>
				<div className="grid gap-2.5 mb-7.5">
					<span className="font-medium text-xl ">Вывод реф. баланса</span>
					<p className="text-xs">Вы точно хотите вывести:</p>
				</div>

				<h1 className="font-bold text-2.5xl mb-11 text-blue-100">
					{withdrawAmount || "0"} TON
				</h1>

				<div className="grid grid-cols-2 gap-2">
					<button
						disabled={loading}
						className="cursor-pointer rounded-2xl min-h-12.5 bg-linear-180 from-red-250 from-0% to-red-300 to-100% shadow-[0px_0px_19.6px_0px_--alpha(var(--color-red-350)_/_50%)]"
					>
						Отмена
					</button>

					<button
						disabled={loading}
						onClick={handleCreateWithdrawBonus}
						className="cursor-pointer rounded-2xl min-h-12.5 bg-linear-0 from-blue-50 from-0% to-blue-100 to-100% shadow-[0px_0px_19.6px_0px_--alpha(var(--color-blue-200)_/_50%)]"
					>
						{loading ? (
							<Icons className="animate-pulse mx-auto" name="loader" />
						) : (
							"Вывести"
						)}
					</button>
				</div>
			</Modal>
		</>
	);
};
