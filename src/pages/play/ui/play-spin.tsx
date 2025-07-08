import { GiftBorderCardVariantThree, useGetGifts } from "@/entities/gift";
import { SpinCarousel } from "@/features/spin-gifts";
import { TouchableLottie } from "@/shared/components/lottie/touchable-lottie";
import { Tabs, type TabsImperativeRef } from "@/shared/ui/tabs/tabs";
import { useParams } from "react-router";
import Gift from "@/shared/assets/lottie/berrybox.json";
import { useGetLobby, useJoinToLobby } from "@/entities/lobby";
import { useMemo, useRef, useState } from "react";
import { Modal } from "@/shared/ui/modal/modal";
import { BottomButton } from "@/shared/components/bottom-button/bottom-button";
import clsx from "clsx";
import { useProfileContext } from "@/entities/profile";
import { SafeAvatar } from "@/shared/ui/avatar/safe-avatar";

export const PlaySpin = () => {
  const { id } = useParams();
  const lobbyParamId = Number(id);

  // const navigate = useNavigate();

  const { profile } = useProfileContext();
  const { joinToLobby } = useJoinToLobby();
  const { lobby, refetch: refetchLobby } = useGetLobby(lobbyParamId);
  const { gifts, refetch: refetchGifts } = useGetGifts({
    take: 25,
    skip: 0,
    min: lobby?.minBet,
    max: lobby?.maxBet,
    blocked: false,
    // userId: profile?.id,
    // true,
  });

  console.log("gifts", gifts);

  const [giftsId, setGiftsId] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const tabsRef = useRef<TabsImperativeRef | null>(null);

  const handleSelectSpinResult = () => {
    // navigate('result', { replace: true });
  };

  const handleSelectGift = (giftId: string, isActive: boolean) => {
    if (isActive) {
      setGiftsId((prev) => prev.filter((id) => id !== giftId));
    } else {
      setGiftsId((prev) => [...prev, giftId]);
    }
  };

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
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

  return (
    <div className="py-2.5 px-6">
      <header className="flex justify-between items-center mb-3">
        <div className="basis-31.5 rounded-lg text-tiny/3 min-h-8 flex items-center justify-center gap-2 bg-dark-blue-150 text-blue-100">
          На победу <span className="font-semibold"> 41%</span>
        </div>
      </header>
      <div className="mb-7.5">
        {lobby && (
          <SpinCarousel
            lobby={lobby}
            gifts={giftsId}
            onSelected={handleSelectSpinResult}
            onRefetchLobby={() => refetchLobby()}
            onRefreshAfterJoining={() => {
              refetchLobby();
              refetchGifts();
            }}
          />
        )}
      </div>

      <div className="mb-5">
        {!isAlreadyBetting && (
          <BottomButton
            withShadow
            className="w-full"
            content="Сделать ставку"
            onClick={handleToggleModal}
            disabled={giftsId.length === 0}
          />
        )}
        {isAlreadyBetting && (
          <div
            className={clsx(
              "shadow-[0px_0px_19.6px_0px_--alpha(var(--color-blue-200)_/_50%)] px-5 py-2",
              "min-h-13.5 rounded-2xl bg-linear-360 from-blue-50 from-0% to-blue-100 to-100 text-white grid items-center",
              "disabled:bg-dark-blue-700 disabled:text-white/50 disabled:shadow-none disabled:bg-linear-[none]",
            )}
          >
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
                  {/* {currentUserBetting?.winRate}% */}
                  75%
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      <Tabs tabs={tabs} listClassName="mb-3" tabsRef={tabsRef}>
        <div className="grid grid-cols-2 gap-3">
          {filteredBlockedGifts?.map((gift) => (
            <GiftBorderCardVariantThree
              size={"lg"}
              key={gift.id}
              slug={gift.slug}
              price={gift.price}
              title={gift.title}
              active={giftsId.includes(gift.id)}
              onClick={() =>
                handleSelectGift(gift.id, giftsId.includes(gift.id))
              }
            />
          ))}
        </div>
        <div className="grid gap-2">
          {lobby?.participants.map((participant, _index, list) => (
            <div key={participant.id} className="bg-dark-blue-900">
              <div className="flex items-center px-4 p-2 gap-3 rounded-lg bg-dark-blue-50">
                <SafeAvatar url={participant.user.image} className="size-8" />
                <span className="text-xs flex-1">
                  {participant.user.username}
                </span>

                <div className="flex items-center gap-1.5">
                  <div className="grid place-content-center items-end gap-1 grid-flow-col bg-dark-blue-150 text-blue-100 rounded-lg min-h-6 basis-14 text-tiny/2.5 font-semibold px-2.5">
                    {participant.amount}{" "}
                    <span className="text-eight/2 font-normal">TON</span>
                  </div>

                  <div className="grid place-items-center bg-dark-blue-150 text-blue-100 rounded-lg min-h-6 basis-11.5 text-tiny font-semibold px-3">
                    {(participant.amount / list.length) * 100}%
                  </div>
                </div>
              </div>
              <div className="grid grid-flow-row grid-cols-[repeat(auto-fill,minmax(60px,60px))] auto-rows-[60px] gap-1.5 p-1.5">
                {participant.gifts.map((gift) => (
                  <TouchableLottie key={gift.id} animation={Gift} />
                ))}
              </div>
            </div>
          ))}
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
            className="cursor-pointer min-h-10.5 grid place-content-center border border-white rounded-lg"
          >
            Не буду ставить
          </button>
          <button
            type="button"
            onClick={handleJoinToLobby}
            className="cursor-pointer min-h-10.5 grid place-content-center bg-blue rounded-lg"
          >
            Сделать ставку
          </button>
        </div>
      </Modal>
    </div>
  );
};

const tabs = ["Ваши Gift's", "Текущие ставки"];
