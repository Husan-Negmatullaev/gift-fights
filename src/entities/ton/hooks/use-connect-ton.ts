import type { Account } from "@tonconnect/ui";
import { useTonConnect } from "./use-ton-connect";
import { useTonConnectStatus } from "./use-ton-connect-status";

type UseConnectTonArgs = {
  onSuccess(account: Account): void;
};

export const useConnectTon = (args: UseConnectTonArgs) => {
  const { onSuccess } = args;
  const { connect, disconnect, account } = useTonConnect();

  const handleConnectWallet = async () => {
    try {
      await connect();
    } catch (err) {
      console.error("Ошибка при интеграции кошелька:", err);
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error("Ошибка при отключении кошелька:", err);
    }
  };

  useTonConnectStatus(
    async (account) => {
      onSuccess(account);
    },
    () => {
      disconnect();
    },
  );

  return {
    account,
    onConnect: handleConnectWallet,
    onDisconnect: handleDisconnectWallet,
  };
};
