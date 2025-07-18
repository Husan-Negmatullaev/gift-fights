import type { GetLobbyQuery } from '@/shared/api/graphql/graphql';
import { LoadableLottie } from '@/shared/components/lottie/loadable-lottie';
import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { Icons } from '@/shared/ui/icons/icons';
import { useLocation, useParams } from 'react-router';
// import { Icons } from 'react-toastify';
// const resultType: Record<"win" | "lose", string> = {
// 	win: "bg-linear-360 from-blue-50 from-0% to-blue-100 to-100%",
// 	lose: "bg-linear-360 from-red-150 from-0% to-red-200 to-100%",
// };

export const Result = () => {
  const navigation = useLocation();
  const { winnerId } = useParams();
  const winnerIdParam = Number(winnerId);

  const lobby = navigation.state.lobby as GetLobbyQuery['lobby'];

  // const winnerParticipant = lobby.participants.find(
  // 	(participant) => participant.userId === winnerIdParam,
  // );

  // const resultStyles = resultType["win"];

  const winner = lobby.participants.find(
    (participant) => participant.userId === winnerIdParam,
  );

  const totalAmount = lobby.participants.reduce((acc, participant) => {
    return acc + participant.amount;
  }, 0);

  const gifts = lobby.participants.reduce(
    (acc, participant) => {
      return acc.concat(participant.gifts);
    },
    [] as Array<{
      __typename?: 'Gift';
      id: string;
      slug: string;
      price: number;
      blocked: boolean;
    }>,
  );

  return (
    <div className="py-7 pb-25">
      <h1 className="font-bold text-xl text-white mb-10 text-center">
        Победитель
      </h1>
      <div className="relative">
        <div
          style={{
            boxShadow:
              '0px 0px 16px 0px #1AC9FF80 inset, 0px 0px 4px 0px #FFFFFF40 inset',
          }}
          className="text-center mb-[28px] bg-[#2D353F] fit w-[196px] h-[196px] mx-auto items-center justify-center place-content-center rounded-[20px] overflow-hidden relative">
          <div className="place-content-center pt-3 ">
            <Avatar
              className="size-[58px] mx-auto relative mb-[8px] "
              style={{
                boxShadow: '0 -4px 52px 22px #1AC9FF',
              }}
              url={winner?.user.image || ''}
            />
            <div className="relative text-[18px] font-[500] mb-[10px]">
              {winner?.user.username}
            </div>
            <div className="relative text-[10px] font-light">{`Выйгрыш`}</div>
            <div className="relative text-[18px] font-[700] text-[#1DC1FD]">{`${totalAmount.toFixed(
              2,
            )} TON`}</div>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Icons name="spin-arrow-bottom" className="size-auto" />
        </div>
      </div>
      <p className="text-regular text-white text-start ml-[24px] mb-4">
        Полученные гифты:
      </p>
      <div className="grid grid-cols-3 mx-6 gap-3">
        {gifts.map((gift) => (
          <LoadableLottie slug={gift.slug} key={gift.id}>
            {(animation) => <GiftCard animation={animation} />}
          </LoadableLottie>
        ))}
      </div>

      {/* <div className="fixed w-full bottom-safe-app-bottom left-1/2 -translate-x-1/2 px-6 pb-4.5">
				<BottomButton
					withShadow
					className="w-full"
					content="Выиграть еше раз"
				/>
			</div> */}
    </div>
  );
};

type GiftCardProps = {
  animation: unknown;
};

const GiftCard = (props: GiftCardProps) => {
  const { animation } = props;

  return (
    <div className="relative pb-[100%] mb-1 rounded-[8px] overflow-hidden">
      <TouchableLottie
        animation={animation}
        className="absolute size-full inset-0 object-cover"
      />
    </div>
  );
};
