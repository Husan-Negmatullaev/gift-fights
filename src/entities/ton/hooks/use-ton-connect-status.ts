import { useTonConnectUI, type Account } from '@tonconnect/ui-react';
import { useEffect } from 'react';

export const useTonConnectStatus = (
  onConnect: (account: Account) => void,
  onDisconnect: () => void,
) => {
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((walletInfo) => {
      if (walletInfo && walletInfo.account) {
        onConnect(walletInfo.account);
      } else {
        onDisconnect?.();
      }
    });

    return () => unsubscribe();
  }, [onConnect, onDisconnect, tonConnectUI]);
};
