import { graphql } from '@/shared/api/graphql';
import {
  LobbyStatus,
  type GetLobbiesQuery,
  type GetLobbiesQueryVariables,
} from '@/shared/api/graphql/graphql';
import { useQuery } from '@apollo/client';

const GET_LOBBIES = graphql(`
  query GetLobbies($take: Int!, $skip: Int!, $status: [LobbyStatus!]) {
    lobbies(take: $take, skip: $skip, status: $status) {
      id
      title
      status
      minBet
      maxBet
      createdAt
      updatedAt
      timeToStart
    }
  }
`);

export const useGetLobbies = (
  take: number,
  skip: number,
  status?: LobbyStatus[],
) => {
  const { data, loading, error, refetch } = useQuery<
    GetLobbiesQuery,
    GetLobbiesQueryVariables
  >(GET_LOBBIES, {
    variables: { take, skip, status: status },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
    // Обновляем данные каждые 30 секунд для актуальности лобби
    pollInterval: 30000,
    // Не кешируем данные долго, чтобы они оставались актуальными
    notifyOnNetworkStatusChange: true,
  });

  return {
    error,
    refetch,
    loading,
    lobbies: data?.lobbies ?? [],
  };
};
