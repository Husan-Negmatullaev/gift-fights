// import { ProfileUserContext } from '../config/profile-user-config-context';
import { ProfileUserContext, useProfile } from '@/entities/profile';
import { useEffect, useState, type ReactNode } from 'react';
// import { useProfile } from '../hooks/use-profile';

type ProfileUserProviderProps = {
  children: ReactNode;
};

export const ProfileUserProvider = (props: ProfileUserProviderProps) => {
  const { children } = props;
  const { profile, loading } = useProfile();

  const [isFirstLoadingTime, setIsFirstLoadingTime] = useState(false);

  useEffect(() => {
    if (profile && !loading) {
      setIsFirstLoadingTime(true);
    }
  }, [profile, loading]);

  const value = { profile: profile!, isFirstLoadingTime: isFirstLoadingTime };

  return (
    <ProfileUserContext.Provider value={value}>
      {children}
    </ProfileUserContext.Provider>
  );
};
