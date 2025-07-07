import { graphql } from "@/shared/api/graphql";
import { useQuery } from "@apollo/client";
import {
  type GetLobbiesQuery,
  type GetLobbiesQueryVariables,
} from "@/shared/api/graphql/graphql";
import { LobbyStatus } from "@/shared/api/graphql/graphql";

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
    fetchPolicy: "network-only",
  });

  return {
    error,
    refetch,
    loading,
    lobbies: data?.lobbies ?? [],
  };
};
