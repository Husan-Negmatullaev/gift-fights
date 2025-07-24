import { graphql } from '@/shared/api/graphql';
import type {
  LiveQuery,
  LiveQueryVariables,
} from '@/shared/api/graphql/graphql';
import { useQuery } from '@apollo/client';

const GET_LIVE = graphql(`
  query Live($take: Int!, $skip: Int!) {
    live(take: $take, skip: $skip) {
      id
      tgId
      username
      lastName
      firstName
      tonAddress
      image
      referralCode
      referredBy
      balance
      bonuses
      lastWonAmount
      displayName
      wins
      losses
      winRate
      createdAt
      updatedAt
    }
  }
`);

export const useGetLive = (args: LiveQueryVariables) => {
  const { data, loading, error, refetch } = useQuery<
    LiveQuery,
    LiveQueryVariables
  >(GET_LIVE, {
    variables: args,
    fetchPolicy: 'network-only',
    pollInterval: 60000,
  });

  return {
    live: data?.live ?? [],
    loading,
    error,
    refetch,
  };
}; 