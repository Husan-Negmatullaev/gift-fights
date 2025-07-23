import type { GetLobbyQuery } from '@/shared/api/graphql/graphql';
import { LoadableLottie } from '@/shared/components/lottie/loadable-lottie';
import { TouchableLottie } from '@/shared/components/lottie/touchable-lottie';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { useLocation, useParams } from 'react-router';

export const Result = () => {
  const navigation = useLocation();
  const { winnerId } = useParams();
  const winnerIdParam = Number(winnerId);

  const lobby = navigation.state.lobby as GetLobbyQuery['lobby'];

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
          className="text-center mb-7 bg-dark-blue-1000 fit size-49 mx-auto items-center justify-center place-content-center rounded-2.5xl overflow-hidden relative">
          <div className="place-content-center pt-3 ">
            <Avatar
              className="size-14.5 mx-auto relative mb-2 "
              style={{
                boxShadow: '0 -4px 52px 22px #1AC9FF',
              }}
              url={winner?.user.image || ''}
            />
            <div className="relative text-lg font-semibold mb-2.5">
              {winner?.user.username}
            </div>
            <div className="relative text-tiny font-light">{`Выигрыш`}</div>
            <div className="relative text-[18px] font-[700] text-blue-300">{`${totalAmount.toFixed(
              0,
            )} TON`}</div>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            alt="Light triangle"
            className="size-auto"
            src="/assets/images/light-triangle.png"
          />
        </div>
      </div>
      <p className="text-regular text-white text-start ml-6 mb-4">
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
