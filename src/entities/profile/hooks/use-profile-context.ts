import { useContext } from 'react';
import { ProfileUserContext } from '../config/profile-user-config-context';


export const useProfileContext = () => {
  return useContext(ProfileUserContext);
};
