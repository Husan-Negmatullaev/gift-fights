import { TelegramAvatar, useTelegram } from '@/entities/telegram';
import { ConnectWalletTon } from '@/entities/ton';
import { AddTon } from '@/features/add-ton';
import clsx from 'clsx';

export const Header = () => {
  const telegram = useTelegram();

  return (
    <header className="fixed w-full top-0 left-0 bg-dark-blue-50 pt-header">
      <div className="container-safe">
        <div
          className={clsx(
            telegram.platform !== 'tdesktop' ? 'min-h-13' : 'min-h-15',
            'px-4 grid place-items-center justify-items-end grid-cols-[auto_1fr] gap-2',
          )}>
          {/* py-3 */}
          <ConnectWalletTon />

          <div className="flex items-center gap-1.5">
            <AddTon />
            <TelegramAvatar />
          </div>
        </div>
      </div>
    </header>
  );
};
