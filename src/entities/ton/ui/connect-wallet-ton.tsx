import { Icons } from "@/shared/ui/icons/icons";
import { useTonConnect } from "../hooks/use-ton-connect";

export const ConnectWalletTon = () => {
  const { connect, disconnect, connected, account, getShortAddress } =
    useTonConnect();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      connect();
    }
  };

  const getDisplayText = () => {
    if (connected && account) {
      return getShortAddress(account.address);
    }
    return "Connect Wallet";
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center bg-blue text-white rounded-full px-2.5 min-h-9 cursor-pointer hover:bg-blue-600 transition-colors"
    >
      <Icons name="ton" width={20} height={20} />

      <span className="font-medium text-xs/4">{getDisplayText()}</span>
    </button>
  );
};
