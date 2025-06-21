import { TelegramAvatar } from '@/entities/telegram';
import { ConnectWalletTon } from '@/entities/ton';
import { AddTon } from '@/features/add-ton';

export const Header = () => {
  return (
    <header className="fixed w-full top-0 left-0 bg-dark-blue-50 mt-safe-app-top">
      <div className="min-h-15 px-6 py-3 grid place-items-end grid-cols-[auto_1fr] gap-2">
        <ConnectWalletTon />

        <div className="flex items-center gap-1.5">
          <AddTon />
          <TelegramAvatar />
        </div>
      </div>
    </header>
  );
};
