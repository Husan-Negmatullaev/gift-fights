import { TonConnectUIProvider } from '@tonconnect/ui-react';
import type { ReactNode } from 'react';

interface TonConnectProviderProps {
  children: ReactNode;
}

export const TonConnectProvider = ({ children }: TonConnectProviderProps) => {
  return (
    <TonConnectUIProvider
      manifestUrl={import.meta.env.VITE_FRONTEND + '/tonconnect-manifest.json'}>
      {children}
    </TonConnectUIProvider>
  );
};
