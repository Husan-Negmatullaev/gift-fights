import type { ProfileQuery } from '@/shared/api/graphql/graphql';
import { createContext } from 'react';

export const ProfileUserContext = createContext<{
  isFirstLoadingTime: boolean;
  profile: ProfileQuery['profile'];
}>({
  isFirstLoadingTime: true,
  profile: {} as ProfileQuery['profile'],
});
