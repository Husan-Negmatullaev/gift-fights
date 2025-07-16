import { graphql } from '@/shared/api/graphql';
import { useQuery } from '@apollo/client';

const GET_LEADERBOARD_INFO = graphql(`
  query LeaderboardInfo {
    leaderboardInfo {
      id
      endDate
      startDate
      status
      createdAt
      updatedAt
    }
  }
`);

export const useGetLeaderboardInfo = () => {
    const { data, loading, error, refetch } = useQuery(GET_LEADERBOARD_INFO as any);

    return {
        loading,
        error,
        refetch,
        data: data?.leaderboardInfo,
    };
};
