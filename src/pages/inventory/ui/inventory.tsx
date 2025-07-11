import {
  GiftCheckboxCard,
  useGetGifts,
  useWithdrawGifts,
} from '@/entities/gift';
import { ProfileInformation } from '@/entities/user';
import { BottomButton } from '@/shared/components/bottom-button/bottom-button';
import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';
import { Modal } from '@/shared/ui/modal/modal';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileContext } from '@/entities/profile';
import {
  useConfirmTransaction,
  useCreateTransaction,
  useTonConnect,
} from '@/entities/ton';
import { TransactionType } from '@/shared/api/graphql/graphql';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { LoadableLottie } from '@/shared/components/lottie/loadable-lottie';
import { LoadingSpinner } from '@/shared/components/loading-spinner/loading-spinner';

interface IFormInput {
  gifts: string[];
}

export const Inventory = () => {
  const { profile } = useProfileContext();
  const { gifts, refetch, loading } = useGetGifts({
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
    () => gifts.filter((gift) => gift.blocked === false),
    [gifts],
  );

  const selectedGiftsIds = getValues('gifts');

  const selectedGifts = useMemo(() => {
    return filteredBlockedGifts.filter((gift) =>
      selectedGiftsIds.includes(gift.id),
    );
  }, [selectedGiftsIds, filteredBlockedGifts]);

  const totalAmount = useMemo(() => {
    return selectedGifts.reduce((acc, gift) => acc + gift.price, 0);
  }, [selectedGifts]);

  const amountWithCommission = totalAmount * 0.01;

  const handleConfirm = () => {
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
          .then(
            (success) => (
              console.log('success', success),
              withdrawGifts({
                giftsIds: selectedGifts.map((gift) => gift.id),
                transactionId: data.data?.createTransaction.id as string,
              }).then(() => {
                handleToggleModal();
                refetch();
              })
            ),
          )
          .catch((error) => console.error('error', error));
      })
      .catch((err) => {
        console.log('Err', err);
      });
  };

  return (
    <div className="pb-16">
      <div className="mb-6">
        <ProfileInformation profile={profile} />
      </div>

      <div className="px-6 pb-6">
        <h5 className="font-thin text-tiny/2.5 mb-2">Ваши Gift's:</h5>

        <ul
          aria-busy={loading}
          className="grid grid-cols-2 peer empty:mb-20 gap-x-2.5 gap-y-2">
          {filteredBlockedGifts.map((gift) => (
            <li key={gift.id}>
              <GiftCheckboxCard
                size="lg"
                key={gift.id}
                slug={gift.slug}
                title={gift.title}
                price={gift.price}
                checkbox={{
                  value: gift.id,
                  ...register('gifts', {
                    required: true,
                  }),
                }}
              />
            </li>
          ))}
        </ul>
        <div className="peer-empty:block peer-busy:hidden hidden">
          <p className="text-center font-medium text-lg">
            Вы можете отправить ваш гифт на аккаунт{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue underline"
              href="https://t.me/gifts_fight_relayer">
              @gifts_fight_relayer
            </a>
          </p>
        </div>

        {loading && <LoadingSpinner />}
      </div>

      {!open && (
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
            console.log('gift', gift);
            return (
              <div
                key={gift.id}
                className="relative pb-[69%] rounded-lg overflow-hidden">
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
            Комиссия будет составлять:{' '}
            <span className="font-bold text-white">{amountWithCommission}</span>
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
