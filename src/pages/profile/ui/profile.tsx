import { GiftBorderCard, useGetWithdrawnGifts } from "@/entities/gift";
import { useProfileContext } from "@/entities/profile";
import { ProfileInformation } from "@/entities/user";
import { ReferralBalanceOutput } from "@/features/refferal-balance-output";
import { useCopy } from "@/shared/hooks/use-copy";
import { useEffect } from "react";
// import { shareURL } from '@telegram-apps/sdk-react';

export const Profile = () => {
  const { onCopy } = useCopy();
  const { profile, refetch } = useProfileContext();

  const { data: withdrawnGifts } = useGetWithdrawnGifts(15, 0);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <section className="grid gap-5 pb-7.5">
      <ProfileInformation profile={profile} />

      <div className="px-6">
        <div className="flex flex-col gap-7.5">
          <article className="relative bg-linear-117 from-blue -from-37% to-dark-blue-50 to-78% rounded-xl rounded-tr-4.5xl text-white">
            <div className="bg-linear-90 overflow-hidden relative from-blue-50 to-blue-100 p-4 rounded-xl rounded-tr-4.5xl">
              <img
                alt="octopus"
                src="/assets/images/play/to-the-moon-rocket.webp"
                className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
              />
              <h2 className="font-medium text-lg/5 max-w-50 mb-1.5">
                Зарабатывайте на приглашениях !
              </h2>
              <p className="max-w-53 font-thin text-tiny/4 text-white/50 mb-5.5">
                Получайте до 20% с выводов своих рефералов !
              </p>
              <div className="bg-dark-blue-50 flex items-center justify-between gap-4 relative rounded-2.5">
                <input
                  readOnly
                  value={profile.referralCode}
                  className="px-3 font-medium text-xs w-full min-h-8.5"
                />
                <button
                  type="button"
                  className="cursor-pointer bg-white rounded-2.5 min-h-8.5 px-4 text-blue font-medium text-xs basis-25 shrink-0"
                  onClick={() =>
                    onCopy(
                      `https://t.me/gift_fights_bot/gift_fight?startapp=${profile.referralCode}`,
                    )
                  }
                >
                  Скопировать
                </button>
              </div>
            </div>
            <img
              alt="telegram cap"
              className="pointer-events-none h-36.5 absolute -top-9 -right-7"
              src="/assets/images/profile/twenty-percent-off.webp"
            />
          </article>

          <ReferralBalanceOutput />
        </div>

        {/* <div className="mb-3">
          <h2 className="text-lg mb-2">Статистика</h2>
          <dl className="grid grid-cols-3 gap-3">
            <div className="bg-dark-blue-50 px-2.5 py-2 rounded-xl">
              <dt className="font-thin text-tiny/2.5 mb-1">Побед</dt>
              <dd className="text-center text-green text-lg font-medium">
                {profile.wins}
              </dd>
            </div>
            <div className="bg-dark-blue-50 px-2.5 py-2 rounded-xl">
              <dt className="font-thin text-tiny/2.5 mb-1">Проигрышей</dt>
              <dd className="text-center text-red text-lg font-medium">
                {profile.losses}
              </dd>
            </div>
            <div className="bg-dark-blue-50 px-2.5 py-2 rounded-xl">
              <dt className="font-thin text-tiny/2.5 mb-1">%</dt>
              <dd className="text-center text-green text-lg font-medium">
                {profile.winRate ? Number(profile.winRate.toFixed(2)) : 0}%
              </dd>
            </div>
          </dl>
        </div> */}

        <div className="bg-dark-blue-50 px-2.5 py-2 rounded-xl">
          <h5 className="font-thin text-tiny/2.5 mb-1">Последние выводы:</h5>

          <ul className="grid grid-cols-4 gap-1 peer">
            {withdrawnGifts.map((gift) => (
              <li key={gift.id}>
                <GiftBorderCard
                  size="md"
                  slug={gift.slug}
                  title={gift.title}
                  price={gift.price}
                />
              </li>
            ))}
          </ul>
          <div className="peer-empty:block hidden">
            <p className="text-center font-medium text-lg">Нет подарков</p>
          </div>
        </div>
      </div>
    </section>
  );
};
