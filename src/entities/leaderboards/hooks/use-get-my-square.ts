import { graphql } from '@/shared/api/graphql';
import type { MyScoreQuery } from '@/shared/api/graphql/graphql';
import { useQuery } from '@apollo/client';

const GET_MY_SCORE_QUERY = graphql(`
  query MyScore {
    myScore {
      userId
      score
      rank
      user {
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
