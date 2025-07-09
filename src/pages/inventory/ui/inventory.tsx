import {
  GiftCheckboxCard,
  useGetGifts,
  useWithdrawGifts,
} from "@/entities/gift";
import { ProfileInformation } from "@/entities/user";
import { BottomButton } from "@/shared/components/bottom-button/bottom-button";
import { TouchableLottie } from "@/shared/components/lottie/touchable-lottie";
import { Modal } from "@/shared/ui/modal/modal";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Gift from "@/shared/assets/lottie/berrybox.json";
import { useProfileContext } from "@/entities/profile";
import {
  useConfirmTransaction,
  useCreateTransaction,
  useTonConnect,
} from "@/entities/ton";
import { TransactionType } from "@/shared/api/graphql/graphql";
import { useTonConnectUI } from "@tonconnect/ui-react";

interface IFormInput {
  gifts: string[];
  transactionId: string | null;
}

export const Inventory = () => {
  const { profile } = useProfileContext();
  const { gifts, refetch } = useGetGifts({
    take: 25,
    skip: 0,
  });
  const [open, setOpen] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const { withdrawGifts } = useWithdrawGifts();
  const { makeTransaction } = useCreateTransaction();
  const { confirmTransaction } = useConfirmTransaction();
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IFormInput>({
    values: {
      gifts: [],
      transactionId: null,
    },
  });

  const { connected, connect } = useTonConnect();

  const handleToggleModal = () => setOpen((prev) => !prev);

  const filteredBlockedGifts = useMemo(
    () => gifts.filter((gift) => gift.blocked === false),
    [gifts],
  );

  const handleConfirm = async (form: IFormInput) => {
    setValue("transactionId", null);
    const selectedGifts = gifts.filter((gift) => form.gifts.includes(gift.id));

    const totalAmount = selectedGifts.reduce(
      (acc, gift) => acc + gift.price,
      0,
    );

    const amountWithCommission = totalAmount * 0.01;

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
          .then(
            (success) => (
              console.log("success", success),
              setValue(
                "transactionId",
                data.data?.createTransaction.id as string,
              ),
              handleToggleModal()
            ),
          )
          .catch((error) => console.error("error", error));
      })
      .catch((err) => {
        console.log("Err", err);
        // reject(false);
      });
  };

  const handleWithdrawGifts = (data: IFormInput) => {
    console.log(data, getValues("transactionId"));
    withdrawGifts({
      giftsIds: data.gifts,
      transactionId: getValues("transactionId")!,
    }).then(() => {
      handleToggleModal();
      refetch();
    });
  };

  return (
    <div className="pb-16">
      <div className="mb-6">
        <ProfileInformation profile={profile} />
      </div>

      <div className="grid grid-cols-2 px-6 pb-6 gap-x-2.5 gap-y-2">
        <h5 className="col-span-2 font-thin text-tiny/2.5">Ваши Gift's:</h5>

        {filteredBlockedGifts.map((gift) => (
          <GiftCheckboxCard
            size="lg"
            key={gift.id}
            slug={gift.slug}
            title={gift.title}
            price={gift.price}
            checkbox={{
              value: gift.id,
              ...register("gifts", {
                required: true,
                // onChange: (e) => {
                //   setValue("gifts", [gift]);
                // },?
              }),
            }}
          />
        ))}
      </div>

      <div className="fixed w-full bottom-safe-app-bottom left-1/2 -translate-x-1/2 px-6 pb-4.5">
        <BottomButton
          withShadow
          content="Вывести"
          className="w-full"
          disabled={!isDirty}
          onClick={handleSubmit(handleConfirm)}
          // onClick={handleSubmit((penis) => penis.gifts)}
        />
      </div>

      <Modal open={open} onClose={handleToggleModal}>
        <div className="mb-4 text-center">
          <h2 className="mb-2 font-medium text-lg/4.5">Вывод Gift’s</h2>
          <p className="mb-4 text-xs">Вы хотите вывести gift’s на сумму:</p>
          <span className="font-medium text-base text-blue-100">
            34,154 TON
          </span>
        </div>

        <div className="grid gap-2 justify-center grid-flow-dense auto-rows-[92px] grid-cols-[repeat(3,_92px)] mb-17">
          {getValues("gifts").map((gift) => (
            <div key={gift} className="relative pb-[69%]">
              <TouchableLottie
                animation={Gift}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-white/50 mb-4">
            Комиссия будет составлять:
          </p>
          <BottomButton
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
