import { graphql } from '@/shared/api/graphql';
import type { GetRewardsQuery } from '@/shared/api/graphql/graphql';
import { useQuery } from '@apollo/client';

// GraphQL запрос для получения наград
const GET_REWARDS = graphql(`
  query GetRewards {
    rewards {
      id
      slug
      place
    }
  }
`);

export const useGetRewards = () => {
  const { data, loading, error, refetch } =
    useQuery<GetRewardsQuery>(GET_REWARDS);

  return {
    loading,
    error,
    refetch,
    data: data?.rewards ?? [],
  };
};
