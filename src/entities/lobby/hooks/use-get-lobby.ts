import { graphql } from "@/shared/api/graphql";
import type {
  GetLobbyQuery,
  GetLobbyQueryVariables,
} from "@/shared/api/graphql/graphql";
import { useQuery } from "@apollo/client";

export const GET_LOBBY = graphql(`
  query GetLobby($id: Int!) {
    lobby(id: $id) {
      id
      title
      status
      minBet
      maxBet
      timeToStart
      winnerId
      createdAt
      updatedAt
      countdownExpiresAt
      participants {
        id
        userId
        amount
        user {
          image
          username
        }
        gifts {
          id
          slug
          price
          blocked
          withdrawable
        }
      }
    }
  }
`);

export const useGetLobby = (id: number) => {
  const { data, loading, error, refetch } = useQuery<
    GetLobbyQuery,
    GetLobbyQueryVariables
  >(GET_LOBBY, { variables: { id } });

  return {
    error,
    refetch,
    loading,
    lobby: data?.lobby,
  };
};
