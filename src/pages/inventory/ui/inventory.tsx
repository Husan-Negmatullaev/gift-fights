import {
	GiftCheckboxCard,
	useGetWithdrawnGifts,
	useWithdrawGifts,
} from "@/entities/gift";
import { useProfileContext } from "@/entities/profile";
import {
	useConfirmTransaction,
	useCreateTransaction,
	useTonConnect,
} from "@/entities/ton";
import { TransactionType } from "@/shared/api/graphql/graphql";
import { BottomButton } from "@/shared/components/bottom-button/bottom-button";
import { LoadingSpinner } from "@/shared/components/loading-spinner/loading-spinner";
import { LoadableLottie } from "@/shared/components/lottie/loadable-lottie";
import { TouchableLottie } from "@/shared/components/lottie/touchable-lottie";
import { useToast } from "@/shared/hooks/use-toast";
import { Icons } from "@/shared/ui/icons/icons";
import { Modal } from "@/shared/ui/modal/modal";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
	gifts: string[];
}

export const Inventory = () => {
	const { profile, refetch, loading } = useProfileContext();
	const gifts = profile?.gifts;
	const { data: withdrawnGifts, loading: withdrawnGiftsLoading } =
		useGetWithdrawnGifts(50, 0);
	const [open, setOpen] = useState(false);
	const [tonConnectUI] = useTonConnectUI();
	const { withdrawGifts } = useWithdrawGifts();
	const { makeTransaction } = useCreateTransaction();
	const { confirmTransaction } = useConfirmTransaction();
	const {
		register,
		getValues,
		handleSubmit,
		formState: { isDirty },
	} = useForm<IFormInput>({
		values: {
			gifts: [],
		},
	});

	const { connected, connect } = useTonConnect();

	const handleToggleModal = () => setOpen((prev) => !prev);

	const filteredBlockedGifts = useMemo(
		// () => mockGifts.filter((gift) => gift.blocked === false),
		// [mockGifts],
		() => gifts.filter((gift) => gift.blocked === false),
		[gifts],
	);

	// const filteredPendingWithdrawnGifts = useMemo(
	// 	() => withdrawnGifts?.filter((gift) => gift.status === "Pending") || [],
	// 	[withdrawnGifts],
	// );

	const selectedGiftsIds = getValues("gifts");

	const selectedGifts = useMemo(() => {
		return filteredBlockedGifts.filter((gift) =>
			selectedGiftsIds.includes(gift.id),
		);
	}, [selectedGiftsIds, filteredBlockedGifts]);

	const totalAmount = useMemo(() => {
		return selectedGifts.reduce((acc, gift) => acc + gift.price, 0);
	}, [selectedGifts]);

	const amountWithCommission = selectedGifts.length * 0.5;
	const { showError } = useToast();
	const handleConfirm = () => {
		if (selectedGifts.some((gift) => gift.withdrawable === false)) {
			showError("Нельзя выводить бесплатные подарки");
			return;
		}
		handleToggleModal();
	};

	const handleWithdrawGifts = async (_form: IFormInput) => {
		const data = await makeTransaction({
			type: TransactionType.Commission,
			amount: amountWithCommission,
		});

		if (!connected) {
			await connect();
			return;
		}

		tonConnectUI
			.sendTransaction({
				validUntil: Math.floor(Date.now() / 1000) + 360,

				messages: [
					{
						payload: data.data?.createTransaction.base64Hash as string,
						address: import.meta.env.VITE_WALLET_ADDRESS,
						amount: String(amountWithCommission * 10 ** 9),
					},
				],
			})
			.then((res) => {
				confirmTransaction({
					boc: res.boc,
					id: data.data?.createTransaction.id as string,
				})
					.then(() =>
						withdrawGifts({
							giftsIds: selectedGifts.map((gift) => gift.id),
							transactionId: data.data?.createTransaction.id as string,
						}).then(() => {
							handleToggleModal();
							refetch();
						}),
					)
					.catch((error) => console.error("error", error));
			})
			.catch((err) => {
				console.log("Err", err);
			});
	};
	if (loading || withdrawnGiftsLoading) {
		return (
			<div className="fixed inset-0 flex items-center justify-center z-50">
				<LoadingSpinner />
			</div>
		);
	}
	return (
		<div className="pb-16">
			<div className="px-6 pb-6">
				{filteredBlockedGifts.length > 0 && (
					<div className="flex flex-col justify-between mb-4">
						<h5 className="font-bold text-[24px]">Ваши Gift's:</h5>
						<p className="text-[#A8A8A8]">
							Выберите подарки, которые хотите вывести. Комиссия за вывод 20% от
							суммы.
						</p>
					</div>
				)}

				<ul className="grid grid-cols-2 peer empty:mb-20 gap-x-2.5 gap-y-2">
					{filteredBlockedGifts.map((gift) => {
						const withdrawnGift = withdrawnGifts?.find(
							(withdrawnGift) => withdrawnGift.giftId === gift.id,
						);
						if (withdrawnGift?.status === "Completed") {
							return null;
						}
						const isGiftWithdrawn =
							withdrawnGift && (withdrawnGift.status as string) !== "Completed";

						if (isGiftWithdrawn) {
							return (
								<li key={gift.id} className="relative ">
									<div className="relative">
										<GiftCheckboxCard
											size="lg"
											key={gift.id}
											slug={gift.slug}
											title={gift.title}
											price={gift.price}
											id={Number(gift.id)}
											// status={gift.status}
											checkbox={{
												value: gift.id,
												...register("gifts", {
													required: true,
												}),
											}}
											withdrawable={gift.withdrawable}
										/>
										<div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] rounded-[16px] flex items-center justify-center">
											<Icons
												name="loader"
												className="animate-spin size-8 text-white"
											/>
										</div>
									</div>
								</li>
							);
						}
						return (
							<li key={gift.id}>
								<GiftCheckboxCard
									size="lg"
									key={gift.id}
									slug={gift.slug}
									title={gift.title}
									price={gift.price}
									id={Number(gift.id)}
									// status={gift.status}
									checkbox={{
										value: gift.id,
										...register("gifts", {
											required: true,
										}),
									}}
									withdrawable={gift.withdrawable}
								/>
							</li>
						);
					})}
				</ul>

				<div
					aria-busy={loading}
					className="aria-busy:hidden peer-empty:block hidden text-center"
				>
					<img
						className="w-80 h-80 mx-auto"
						src={"assets/images/empty_chest.png"}
						alt=""
					/>
					<p className=" font-bold text-lg">Инвентарь пуст</p>
					<p className="font-regular text-lg text-[#A8A8A8]">
						{"Хотите начать игру?"}
						<br />
						{"Отправь NFT подарок "}
						<a
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-100 underline"
							href="https://t.me/labs_relayer"
						>
							@labs_relayer,
						</a>
						<br />
						{" и начните битву"}
					</p>
				</div>
			</div>

			{!open && filteredBlockedGifts.length > 0 && (
				<div className="fixed w-full bottom-safe-app-bottom left-1/2 -translate-x-1/2 px-6 pb-4.5">
					<BottomButton
						variant="primary"
						withShadow
						content="Вывести"
						className="w-full"
						disabled={!isDirty}
						onClick={handleSubmit(handleConfirm)}
						// onClick={handleSubmit((penis) => penis.gifts)}
					/>
				</div>
			)}

			<Modal open={open} onClose={handleToggleModal}>
				<div className="mb-4 text-center">
					<h2 className="mb-2 font-medium text-lg/4.5">Вывод Gift’s</h2>
					<p className="mb-4 text-xs">Вы хотите вывести gift’s на сумму:</p>
					<span className="font-medium text-base text-blue-100">
						{totalAmount} TON
					</span>
				</div>

				<div className="grid gap-2 justify-center grid-flow-dense auto-rows-[92px] grid-cols-[repeat(3,_92px)] mb-17">
					{selectedGifts.map((gift) => {
						return (
							<div
								key={gift.id}
								className="relative pb-[69%] rounded-lg overflow-hidden"
							>
								<LoadableLottie slug={gift.slug}>
									{(animationData) => (
										<TouchableLottie
											animation={animationData}
											className="absolute inset-0 size-full object-cover"
										/>
									)}
								</LoadableLottie>
							</div>
						);
					})}
				</div>

				<div className="text-center">
					<p className="text-xs text-white/50 mb-4">
						Комиссия будет составлять: <span>{amountWithCommission} TON</span>
					</p>
					<BottomButton
						variant="primary"
						withShadow
						content="Вывести"
						className="w-full"
						onClick={handleSubmit(handleWithdrawGifts)}
					/>
				</div>
			</Modal>
		</div>
	);
};
