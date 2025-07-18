import React, { type ReactNode } from 'react';
import { LobbyContext } from '@/entities/lobby/config/lobby-context';
import { useGetLobbies } from '@/entities/lobby';
import { LobbyStatus } from '@/shared/api/graphql/graphql';
import { useGlobalLobbyUpdates } from '../hooks/use-global-lobby-updates';

interface LobbyProviderProps {
  children: ReactNode;
}

export const LobbyProvider: React.FC<LobbyProviderProps> = ({ children }) => {
  const { refetch } = useGetLobbies(15, 0, [
    LobbyStatus.Countdown,
    LobbyStatus.InProcess,
    LobbyStatus.WaitingForPlayers,
  ]);

  // Глобальная подписка на события лобби
  useGlobalLobbyUpdates((event, payload) => {
    console.log('Глобальное событие лобби:', event, payload);

    // Обновляем кеш при любых изменениях в лобби
    if (
      event === 'lobby-winner-found' ||
      event === 'lobby-countdown-has-begun' ||
      event === 'lobby-process-of-finding-winner-has-begun' ||
      event === 'user-joined-to-lobby'
    ) {
      refetch();
    }
  });

  return (
    <LobbyContext.Provider value={{ refetchLobbies: refetch }}>
      {children}
    </LobbyContext.Provider>
  );
};
