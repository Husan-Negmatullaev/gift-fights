import {
  SelectableItemGift,
  useGetGifts,
  useGetWithdrawnGifts,
  useWithdrawGifts,
} from '@/entities/gift';
import { useProfileContext } from '@/entities/profile';
import {
  useConfirmTransaction,
  useCreateTransaction,
  useTonConnect,
} from '@/entities/ton';
import { ProfileInformation } from '@/entities/user';
import { TransactionType } from '@/shared/api/graphql/graphql';
import { BottomButton } from '@/shared/components/bottom-button/bottom-button';
import { LoadingSpinner } from '@/shared/components/loading-spinner/loading-spinner';
import { LoadableLottie } from '@/shared/components/lottie/loadable-lottie';
import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';
import { Icons } from '@/shared/ui/icons/icons';
import { Modal } from '@/shared/ui/modal/modal';
import { useTonConnectUI } from '@tonconnect/ui-react';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
  gifts: string[];
}

// const mockGifts = [
// 	{
// 		id: "gift-1",
// 		slug: "swisswatch-13036",
// 		msgId: 1,
// 		title: "Pepe Gift",
// 		model: "pepe-model",
// 		price: 10.5,
// 		symbol: "PEPE",
// 		userId: "user-1",
// 		blocked: false,
// 		externalId: "ext-1",
// 		symbolPermille: 1000,
// 		rarityPermille: 500,
// 		backgroundPermille: 200,
// 		status: "Withdrawing",
// 	},
// 	{
// 		id: "gift-2",
// 		slug: "swisswatch-13036",
// 		msgId: 2,
// 		title: "Froggy Gift",
// 		model: "froggy-model",
// 		price: 15.0,
// 		symbol: "FROG",
// 		userId: "user-1",
// 		blocked: false,
// 		externalId: "ext-2",
// 		symbolPermille: 1200,
// 		rarityPermille: 600,
// 		backgroundPermille: 300,
// 		status: "Available",
// 	},
// 	{
// 		id: "gift-3",
// 		slug: "swisswatch-13036",
// 		msgId: 3,
// 		title: "Cap Gift",
// 		model: "cap-model",
// 		price: 8.75,
// 		symbol: "CAP",
// 		userId: "user-1",
// 		blocked: false,
// 		externalId: "ext-3",
// 		symbolPermille: 800,
// 		rarityPermille: 400,
// 		backgroundPermille: 150,
// 		status: "Available",
// 	},
// ];

export const Inventory = () => {
  const { profile } = useProfileContext();
  const { gifts, refetch, loading } = useGetGifts({
    take: 25,
    skip: 0,
  });
  const { data: withdrawnGifts } = useGetWithdrawnGifts(15, 0);
  // const loading = true;
  const [open, setOpen] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const { withdrawGifts } = useWithdrawGifts();
  const { makeTransaction } = useCreateTransaction();
  const { confirmTransaction } = useConfirmTransaction();
  const {
    // register,
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

  const filteredPendingWithdrawnGifts = useMemo(
    () => withdrawnGifts?.filter((gift) => gift.status === 'Pending') || [],
    [withdrawnGifts],
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

  const amountWithCommission = selectedGifts.length * 0.5;

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
          .then(() =>
            withdrawGifts({
              giftsIds: selectedGifts.map((gift) => gift.id),
              transactionId: data.data?.createTransaction.id as string,
            }).then(() => {
              handleToggleModal();
              refetch();
            }),
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

        <ul className="grid grid-cols-2 peer empty:mb-20 gap-x-2.5 gap-y-2">
          {filteredPendingWithdrawnGifts.map((gift) => (
            <li key={gift.id} className="relative h-57">
              <article
                className={clsx(
                  'bg-dark-blue-50 text-white rounded-four has-checked:bg-dark-blue-650 transition-colors h-full items-center justify-center relative',
                )}>
                <Icons
                  name="loader"
                  className="animate-spin size-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </article>
            </li>
          ))}

          {filteredBlockedGifts.map((gift) => (
            // {mockGifts.map((gift) => (
            <li key={gift.id}>
              <SelectableItemGift
                size="lg"
                key={gift.id}
                slug={gift.slug}
                title={gift.title}
                price={gift.price}
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }} // status={gift.status}
                // checkbox={{
                //   value: gift.id,
                //   ...register('gifts', {
                //     required: true,
                //   }),
                // }}
              />
            </li>
          ))}
        </ul>
        {loading && (
          <div className="mt-10 mx-auto flex justify-center">
            <LoadingSpinner />
          </div>
        )}
        <div
          aria-busy={loading}
          className="aria-busy:hidden peer-empty:block hidden">
          <p className="text-center font-medium text-lg">
            Вы можете отправить ваш гифт на аккаунт{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-100 underline"
              href="https://t.me/labs_relayer">
              @labs_relayer
            </a>
          </p>
        </div>
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
            Комиссия будет составлять: <span>{amountWithCommission} TON</span>
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
