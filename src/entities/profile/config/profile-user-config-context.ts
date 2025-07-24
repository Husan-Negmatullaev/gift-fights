import type { ProfileQuery } from '@/shared/api/graphql/graphql';
import type { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { createContext } from 'react';

export const ProfileUserContext = createContext<{
  refetch: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<ProfileQuery>>;
  isFirstLoadingTime: boolean;
  loading: boolean;
  profile: ProfileQuery['profile'];
}>({
  isFirstLoadingTime: false,
  loading: false,
  profile: {} as ProfileQuery['profile'],
  refetch: () => Promise.resolve({} as ApolloQueryResult<ProfileQuery>),
});
