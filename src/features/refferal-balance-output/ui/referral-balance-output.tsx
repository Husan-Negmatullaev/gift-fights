import { useProfileContext } from '@/entities/profile';
import { useCreateWithdrawBonus } from '@/entities/user';
import { useToast } from '@/shared/hooks/use-toast';
import { Icons } from '@/shared/ui/icons/icons';
import { Modal } from '@/shared/ui/modal/modal';
import { useCallback, useState } from 'react';

export const ReferralBalanceOutput = () => {
  const { profile, refetch } = useProfileContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showSuccess, showError } = useToast();
  const { createWithdrawBonus, loading } = useCreateWithdrawBonus();

  const handleToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleCreateWithdrawBonus = () => {
    createWithdrawBonus({ amount: 0.0001 })
      .then(() => {
        refetch();
        handleToggleModal();
        showSuccess('Вывод реф. баланса успешно создан');
      })
      .catch(() => {
        showError('Ошибка при выводе реф. баланса');
      });
  };

  const bonuses = profile.bonuses;

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

  const onErrorWithdraw = useCallback(async () => {
    // Показываем toast уведомление
    showError('Не хватает реф. баланса!');

    // Вибрация через Telegram WebApp
    if (isTelegramWebApp() && window.Telegram.WebApp.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    } else if (canVibrate()) {
      // Fallback: обычная вибрация для браузера
      window.navigator.vibrate(100);
    }
  }, [showError]);

  return (
    <>
      <article className="relative bg-dark-blue-50 rounded-xl rounded-tr-4.5xl text-white mb-6">
        <div className="bg-dark-blue-50 overflow-hidden relative p-4 rounded-xl rounded-tr-4.5xl">
          <img
            alt="octopus"
            src="/assets/images/profile/ton-bg.webp"
            className="pointer-events-none absolute top-0 left-0 h-37.5 w-77"
          />
          <h2 className="font-medium text-lg/5 max-w-50 mb-1.5">
            Заработано с рефералов
          </h2>
          <p className="max-w-53 font-thin text-tiny/4 text-white/50 mb-5.5">
            Заявка на вывод модерируется в ручную и может занять до 24 часов
          </p>
          <div className="bg-dark-blue flex items-center justify-between gap-4 relative rounded-2.5">
            <input
              readOnly
              value={`${bonuses} TON`}
              className="px-3 font-medium text-xs w-full min-h-8.5"
            />
            <button
              type="button"
              // disabled={bonuses === 0}
              onClick={bonuses === 0 ? onErrorWithdraw : handleToggleModal}
              className="disabled:bg-dark-blue-700 disabled:cursor-not-allowed cursor-pointer rounded-2.5 min-h-8.5 px-4 text-white font-medium text-xs basis-25 shrink-0"
              style={{
                background: 'linear-gradient(90deg, #2D83EC 0%, #1AC9FF 100%)',
              }}>
              Вывести
            </button>
          </div>
        </div>
        <img
          alt="telegram cap"
          src="/assets/images/profile/wallet.webp"
          className="pointer-events-none h-36.5 absolute -top-9.5 -right-7"
        />
      </article>

      <Modal
        open={isModalOpen}
        onClose={handleToggleModal}
        contentClassName="text-center">
        <div className="grid gap-2.5 mb-7.5">
          <span className="font-medium text-xl ">Вывод реф. баланса</span>
          <p className="text-xs">Вы точно хотите вывести:</p>
        </div>

        <h1 className="font-bold text-2.5xl mb-11 text-blue-100">
          {bonuses} TON
        </h1>

        <div className="grid grid-cols-2 gap-2">
          <button
            disabled={loading}
            className="cursor-pointer rounded-2xl min-h-12.5 bg-linear-180 from-red-250 from-0% to-red-300 to-100% shadow-[0px_0px_19.6px_0px_--alpha(var(--color-red-350)_/_50%)]">
            Отмена
          </button>

          <button
            disabled={loading}
            onClick={handleCreateWithdrawBonus}
            className="cursor-pointer rounded-2xl min-h-12.5 bg-linear-0 from-blue-50 from-0% to-blue-100 to-100% shadow-[0px_0px_19.6px_0px_--alpha(var(--color-blue-200)_/_50%)]">
            {loading ? (
              <Icons className="animate-pulse mx-auto" name="loader" />
            ) : (
              'Вывести'
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};
