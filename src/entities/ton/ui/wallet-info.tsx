import { Icons } from '@/shared/ui/icons/icons';
import { useTonConnect } from '../hooks/use-ton-connect';

export const WalletInfo = () => {
  const { connected, account, disconnect, getShortAddress } = useTonConnect();

  if (!connected || !account) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 bg-dark-blue-100 rounded-full px-3 py-1">
      <Icons name="ton" width={16} height={16} className="text-white" />
      <span className="text-xs text-white font-medium">
        {getShortAddress(account.address)}
      </span>
      <button
        onClick={disconnect}
        className="text-white hover:text-red-400 transition-colors">
        <Icons name="cross" width={12} height={12} />
      </button>
    </div>
  );
};
