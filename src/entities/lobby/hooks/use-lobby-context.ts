import { useContext } from 'react';
import { LobbyContext } from '../config/lobby-context';

export const useLobbyContext = () => {
  return useContext(LobbyContext);
};
