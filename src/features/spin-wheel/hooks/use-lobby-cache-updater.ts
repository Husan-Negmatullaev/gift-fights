import { useCallback } from 'react';
import { useLobbyContext } from '@/entities/lobby';

export const useLobbyCacheUpdater = () => {
  const { refetchLobbies } = useLobbyContext();

  const updateLobbyCache = useCallback(() => {
    console.log('Обновляем кеш лобби после завершения игры');
    refetchLobbies();
  }, [refetchLobbies]);

  return { updateLobbyCache };
};
