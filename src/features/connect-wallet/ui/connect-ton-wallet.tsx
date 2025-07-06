import {
  useConnectTon,
  useTonConnect,
  useIntegrateTonWalletToUser,
} from "@/entities/ton";
import { Icons } from "@/shared/ui/icons/icons";

export const ConnectTonWallet = () => {
  const { integrateWallet } = useIntegrateTonWalletToUser();

  const { connected, account, getShortAddress } = useTonConnect();

  const { onConnect, onDisconnect } = useConnectTon({
    async onSuccess(account) {
      integrateWallet(account.address);
    },
  });

  return (
    <>
      {!connected && (
        <button
          type="button"
          onClick={onConnect}
          className="flex items-center bg-blue text-white rounded-full px-2.5 min-h-9 cursor-pointer hover:bg-blue-600 transition-colors"
        >
          <Icons name="ton" width={20} height={20} />

          <span className="font-medium text-xs/4">Connect Wallet</span>
        </button>
      )}

      {connected && account?.address && (
        <button
          type="button"
          onClick={onDisconnect}
          className="flex items-center gap-1 bg-dark-blue-1050 text-white rounded-full px-2.5 min-h-9 cursor-pointer hover:bg-blue-600 transition-colors"
        >
          <Icons name="cross" width={16} height={16} />

          <span className="font-medium text-xs/4">
            {getShortAddress(account.address)}
          </span>
        </button>
      )}
    </>
  );
};
