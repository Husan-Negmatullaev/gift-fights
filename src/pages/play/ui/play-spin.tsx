import { GiftBorderCardVariantThree, useGetGifts } from '@/entities/gift';
import { useGetLobby, useJoinToLobby } from '@/entities/lobby';
import { useProfileContext } from '@/entities/profile';
import { SpinWheelContainer } from '@/features/spin-wheel';
import { BottomButton } from '@/shared/components/bottom-button/bottom-button';
import { LoadableLottie } from '@/shared/components/lottie/loadable-lottie';
import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';
import { useToast } from '@/shared/hooks/use-toast';
import { SafeAvatar } from '@/shared/ui/avatar/safe-avatar';
import { Icons } from '@/shared/ui/icons/icons';
import { Modal } from '@/shared/ui/modal/modal';
import { Tabs, type TabsImperativeRef } from '@/shared/ui/tabs/tabs';
import clsx from 'clsx';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export const PlaySpin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lobbyParamId = Number(id);
  const { profile } = useProfileContext();
  const { joinToLobby, loading } = useJoinToLobby();
  const { lobby, refetch: refetchLobby } = useGetLobby(lobbyParamId);
  const { gifts, refetch: refetchGifts } = useGetGifts({
    take: 25,
    skip: 0,
    // min: lobby?.minBet,
    // max: lobby?.maxBet,
    blocked: false,
  });
  const { showError } = useToast();
  const [giftsId, setGiftsId] = useState<string[]>([]);
  const [isOpenModal, setIsOspenModal] = useState(false);
  const tabsRef = useRef<TabsImperativeRef | null>(null);

  function isTelegramWebApp() {
    return typeof window !== 'undefined' && !!window.Telegram?.WebApp;
  }

  function canVibrate() {
    return (
      typeof window !== 'undefined' &&
      'vibrate' in window.navigator &&
      typeof window.navigator.vibrate === 'function'
    );
  }

  const onErrorJoinToLobby = useCallback(
    async (text: string) => {
      // Показываем toast уведомление
      showError(text);

      // Вибрация через Telegram WebApp
      if (isTelegramWebApp() && window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      } else if (canVibrate()) {
        // Fallback: обычная вибрация для браузера
        window.navigator.vibrate(100);
      }
    },
    [showError],
  );
  const handleSelectSpinResult = (winnerId: string) => {
    navigate(`/spin/${lobbyParamId}/result/${winnerId}`, {
      replace: true,
      state: {
        lobby,
      },
    });
  };

  const handleSelectGift = (giftId: string, isActive: boolean) => {
    if (isActive) {
      setGiftsId((prev) => prev.filter((id) => id !== giftId));
    } else {
      setGiftsId((prev) => [...prev, giftId]);
    }
  };

  const handleToggleModal = () => {
    setIsOspenModal((prev) => !prev);
  };

  const handleJoinToLobby = () => {
    joinToLobby(lobbyParamId, giftsId).then(() => {
      tabsRef.current?.onForceTab(1);
      refetchLobby();
      refetchGifts();
      handleToggleModal();
    });
  };

  const currentUserBetting = lobby?.participants.find(
    (participant) => participant.userId === profile?.id,
  );

  const isAlreadyBetting = Boolean(currentUserBetting);

  const filteredBlockedGifts = useMemo(
    () => gifts.filter((gift) => gift.blocked === false),
    [gifts],
  );

  const totalAmount = useMemo(
    () =>
      lobby?.participants.reduce(
        (acc, participant) => acc + participant.amount,
        0,
      ) || 0,
    [lobby?.participants],
  );

  const winRate = useMemo(() => {
    if (totalAmount === 0) return 0;
    return ((currentUserBetting?.amount || 0) / totalAmount) * 100;
  }, [totalAmount, currentUserBetting?.amount]);

  return (
    <div className={'py-2.5 px-6'}>
      <h1 className="mb-5 font-semibold text-2xl text-center">
        {lobby?.title}
      </h1>
      <header className="flex justify-between items-center mb-3">
        <div className="basis-31.5 rounded-lg text-tiny/3 min-h-8 flex items-center justify-center gap-2 bg-dark-blue-150 text-blue-100">
          На победу{' '}
          <span className="font-semibold"> {winRate.toFixed(0)}%</span>
        </div>
      </header>
      <div className="mb-7.5">
        {lobby && (
          <SpinWheelContainer
            onSelected={handleSelectSpinResult}
            onRefetchLobby={() => refetchLobby()}
            onRefreshAfterJoining={() => {
              refetchLobby();
              refetchGifts();
            }}
            lobby={lobby}
          />
        )}
      </div>

      <div className="mb-5">
        {!isAlreadyBetting && (
          <BottomButton
            withShadow
            className="w-full"
            content="Сделать ставку"
            onClick={() => {
              const selectedGifts = gifts.filter((gift) =>
                giftsId.includes(gift.id),
              );

              const totalPrice = selectedGifts.reduce(
                (acc, gift) => acc + gift.price,
                0,
              );
              if (lobby?.minBet && totalPrice < lobby.minBet) {
                console.log('<');
                onErrorJoinToLobby(
                  `Стоимость подарков должна быть не меньше ${lobby.minBet} TON`,
                );
                return;
              }
              if (lobby?.maxBet && totalPrice > lobby.maxBet) {
                console.log('>');
                onErrorJoinToLobby(
                  `Стоимость подарков должна быть не больше ${lobby.maxBet} TON`,
                );
                return;
              }
              handleToggleModal();
            }}
          />
        )}
        {isAlreadyBetting && (
          <div
            className={clsx(
              'shadow-[0px_0px_19.6px_0px_--alpha(var(--color-blue-200)_/_50%)] px-5 py-2',
              'min-h-13.5 rounded-2xl bg-linear-360 from-blue-50 from-0% to-blue-100 to-100 text-white grid items-center',
              'disabled:bg-dark-blue-700 disabled:text-white/50 disabled:shadow-none disabled:bg-linear-[none]',
            )}>
            <dl className="grid grid-flow-col content-center justify-between gap-1 text-white">
              <div className="text-left">
                <dt className="font-thin mb-0.5 text-tiny/2.5">Ставка:</dt>
                <dd className="font-medium text-lg/4.5">
                  {currentUserBetting?.amount} TON
                </dd>
              </div>

              <div className="text-right">
                <dt className="font-thin mb-0.5 text-tiny/2.5">Шанс победы:</dt>
                <dd className="font-medium text-lg/4.5">
                  {winRate.toFixed(0)}%
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      <Tabs tabs={tabs} listClassName="mb-3" tabsRef={tabsRef}>
        <div>
          <ul className="grid grid-cols-2 gap-3 peer">
            {filteredBlockedGifts?.map((gift) => (
              <li key={gift.id}>
                <GiftBorderCardVariantThree
                  size={'lg'}
                  className="w-full"
                  slug={gift.slug}
                  price={gift.price}
                  title={gift.title}
                  active={giftsId.includes(gift.id)}
                  onClick={() =>
                    handleSelectGift(gift.id, giftsId.includes(gift.id))
                  }
                />
              </li>
            ))}
          </ul>
          <div className="peer-empty:block py-15 hidden">
            <div className="text-center">
              <p className="font-thin text-lg/5 text-white/70 mb-6">
                У вас нет доступных gift's для осуществления ставки
              </p>

              <p className="font-medium text-lg/5 text-white mb-2">
                Отправьте свои Gift's сюда, для пополнения
              </p>

              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 underline"
                href="https://t.me/labs_relayer">
                @labs_relayer
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="grid gap-2 peer">
            {lobby?.participants.map((participant, _index) => (
              <div key={participant.id} className="bg-dark-blue-900">
                <div className="flex items-center px-4 p-2 gap-3 rounded-lg bg-dark-blue-50">
                  <SafeAvatar url={participant.user.image} className="size-8" />
                  <span className="text-xs flex-1">
                    {participant.user.username}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <div className="grid place-content-center items-end gap-1 grid-flow-col bg-dark-blue-150 text-blue-100 rounded-lg min-h-6 basis-14 text-tiny/2.5 font-semibold px-2.5">
                      {participant.amount}
                      <span className="text-eight/2 font-normal">TON</span>
                    </div>

                    <div className="grid place-items-center bg-dark-blue-150 text-blue-100 rounded-lg min-h-6 basis-11.5 text-tiny font-semibold px-3">
                      {Math.min(
                        (participant.amount / totalAmount) * 100,
                        100,
                      ).toFixed(2)}
                      %
                    </div>
                  </div>
                </div>
                <div className="grid grid-flow-row grid-cols-[repeat(auto-fill,minmax(60px,60px))] auto-rows-[60px] gap-1.5 p-1.5">
                  {participant.gifts.map((gift) => (
                    <LoadableLottie key={gift.id} slug={gift.slug}>
                      {(animationData) => (
                        <TouchableLottie
                          animation={animationData}
                          className="rounded-four overflow-hidden"
                        />
                      )}
                    </LoadableLottie>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="peer-empty:block py-15 hidden text-center">
            <p className="font-medium text-lg/5 text-white mb-2">
              Ни одной ставки не сделано
            </p>
          </div>
        </div>
      </Tabs>

      <Modal open={isOpenModal} onClose={handleToggleModal}>
        <p className="text-lg font-medium mb-7.5 text-center mt-2 mx-2">
          Вы хотите сделать ставку ? После подтверждения ее нельзя будет
          отменить !
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={handleToggleModal}
            className="cursor-pointer min-h-10.5 grid place-content-center border border-white rounded-lg">
            Не буду ставить
          </button>
          <button
            type="button"
            onClick={handleJoinToLobby}
            className="cursor-pointer min-h-10.5 grid place-content-center bg-blue rounded-lg">
            {loading ? (
              <Icons className="mx-auto animate-spin" name="loader" />
            ) : (
              'Сделать ставку'
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
};

const tabs = ["Ваши Gift's", 'Текущие ставки'];
