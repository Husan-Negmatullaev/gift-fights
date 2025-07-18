import { initTelegram } from '@/entities/telegram';
import { AppRouterProvider } from './providers/router-provider/ui/app-router-provider';
import './styles/index.css';
import ReactModal from 'react-modal';
import { useEffect } from 'react';
import { ApolloProvider } from './providers/apolo-provider';
import { TonConnectProvider } from '@/entities/ton';
import { ProfileUserProvider } from '@/features/profile-user-provider';
import { ToastProvider } from './providers/toast-provider';
import { extend } from '@pixi/react';
import { Container, Graphics, Text, Sprite } from 'pixi.js';
import { LobbyProvider } from '@/features/lobby';

extend({ Container, Graphics, Text, Sprite });

function App() {
  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <TonConnectProvider>
      <ApolloProvider>
        <ProfileUserProvider>
          <LobbyProvider>
            <AppRouterProvider />
            <ToastProvider />
          </LobbyProvider>
        </ProfileUserProvider>
      </ApolloProvider>
    </TonConnectProvider>
  );
}

export default App;

ReactModal.setAppElement('#root');
