import { graphql } from '@/shared/api/graphql';
import type {
  GetLeaderboardQuery,
  GetLeaderboardQueryVariables,
} from '@/shared/api/graphql/graphql';
import { useQuery } from '@apollo/client';

const GET_LEADERBOARD = graphql(`
  query GetLeaderboard($start: Int!, $end: Int!) {
    leaderboard(start: $start, end: $end) {
      userId
      score
      rank
      user {
        image
        username
      }
    }
  }
`);

export const useGetLeaderboard = (start: number, end: number) => {
  const { data, loading, error, refetch } = useQuery<
    GetLeaderboardQuery,
    GetLeaderboardQueryVariables
  >(GET_LEADERBOARD, {
    variables: { start, end },
  });

  return { data, loading, error, refetch };
};
