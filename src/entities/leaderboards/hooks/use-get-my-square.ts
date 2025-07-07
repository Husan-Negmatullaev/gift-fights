import { graphql } from '@/shared/api/graphql';
import { useQuery } from '@apollo/client';
import type { MyScoreQuery } from '@/shared/api/graphql/graphql';

const GET_MY_SCORE_QUERY = graphql(`
  query MyScore {
    myScore {
      userId
      score
      rank
      user {
        username
      }
    }
  }
`);

export const useGetMySquare = () => {
  const { data, loading, error, refetch } =
    useQuery<MyScoreQuery>(GET_MY_SCORE_QUERY);

  return {
    error,
    loading,
    refetch,
    data: data?.myScore,
  };
};
