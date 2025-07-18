import { createContext } from 'react';
import type { ApolloQueryResult, OperationVariables } from '@apollo/client';
import type { GetLobbiesQuery } from '@/shared/api/graphql/graphql';

export interface LobbyContextType {
  refetchLobbies: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<GetLobbiesQuery>>;
}

export const LobbyContext = createContext<LobbyContextType>({
  refetchLobbies: () =>
    Promise.resolve({} as ApolloQueryResult<GetLobbiesQuery>),
});
