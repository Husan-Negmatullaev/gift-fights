import { Icons } from '@/shared/ui/icons/icons';

export const ConnectWalletTon = () => {
  return (
    <button
      type="button"
      className="flex items-center bg-blue text-white rounded-full px-2.5 min-h-9 cursor-pointer">
      <Icons name="ton" width={20} height={20} />

      <span className="font-medium text-xs/4">Connect Wallet</span>
    </button>
  );
};
