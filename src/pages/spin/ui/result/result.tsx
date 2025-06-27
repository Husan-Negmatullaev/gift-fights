import { GiftHeaderCard } from '@/entities/gift';
import { UserCard } from '@/entities/user';
import { BottomButton } from '@/shared/components/bottom-button/bottom-button';
import { clsx } from 'clsx';

const resultType: Record<'win' | 'lose', string> = {
  win: 'bg-linear-360 from-blue-50 from-0% to-blue-100 to-100%',
  lose: 'bg-linear-360 from-red-150 from-0% to-red-200 to-100%',
};

export const Result = () => {
  const resultStyles = resultType['win'];

  return (
    <div className="py-7 pb-25">
      <h1 className="font-bold text-xl text-white mb-4 text-center">
        Победитель
      </h1>

      <div className="grid gap-2 relative text-center mb-3">
        <div
          className={clsx(
            resultStyles,
            'pointer-events-none absolute top-4 left-0 h-50 w-full border-y border-white',
          )}
        />
        <div className="relative grid gap-2 place-items-center">
          <UserCard
            imageWidth={115}
            className="h-60 w-37.5 !bg-dark-blue-750"
          />
          <h5 className="text-base">Вы победили и выйграли:</h5>
          <div
            className={clsx(
              resultStyles,
              'font-semibold text-base/2 border border-white/30 min-h-9 rounded-xl grid place-content-center px-7',
            )}>
            54,32 TON
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 mx-6 gap-3">
        <GiftHeaderCard url="/assets/images/gifts/gift.webp" />
        <GiftHeaderCard url="/assets/images/gifts/gift.webp" />
        <GiftHeaderCard url="/assets/images/gifts/gift.webp" />
        <GiftHeaderCard url="/assets/images/gifts/gift.webp" />
        <GiftHeaderCard url="/assets/images/gifts/gift.webp" />
        <GiftHeaderCard url="/assets/images/gifts/gift.webp" />
      </div>

      <div className="fixed w-full bottom-safe-app-bottom left-1/2 -translate-x-1/2 px-6 pb-4.5">
        <BottomButton
          withShadow
          className="w-full"
          content="Выиграть еше раз"
        />
      </div>
    </div>
  );
};
