import { useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import { useTonConnectStatus } from "./use-ton-connect-status";

export const useTonConnect = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [connected, setConnected] = useState(tonConnectUI.connected);
  const [account, setAccount] = useState(tonConnectUI.account);

  const connect = async () => {
    try {
      if (tonConnectUI.connected) {
        return;
      }

      tonConnectUI.openModal();
    } catch (error) {
      console.error("Ошибка при подключении кошелька:", error);
      throw error;
    }
  };

  useTonConnectStatus(
    (account) => {
      setConnected(true);
      setAccount(account);
    },
    () => {
      setConnected(false);
      setAccount(null);
    },
  );

  const disconnect = () => {
    tonConnectUI.disconnect();
    setConnected(false);
    setAccount(null);
  };

  const getShortAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return {
    connect,
    disconnect,
    getShortAddress,
    account,
    connected,
  };
};
