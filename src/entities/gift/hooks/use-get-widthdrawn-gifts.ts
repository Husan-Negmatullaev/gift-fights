import { graphql } from '@/shared/api/graphql';
import { useQuery } from '@apollo/client';
import type {
  WithdrawnGiftsQuery,
  WithdrawnGiftsQueryVariables,
} from '@/shared/api/graphql/graphql';

const GET_WITHDRAWN_GIFTS_QUERY = graphql(`
  query WithdrawnGifts($take: Int!, $skip: Int!) {
    withdrawnGifts(take: $take, skip: $skip) {
      id
      slug
      title
      price
    }
  }
`);

export const useGetWithdrawnGifts = (take: number, skip: number) => {
  const { data, loading, error, refetch } = useQuery<
    WithdrawnGiftsQuery,
    WithdrawnGiftsQueryVariables
  >(GET_WITHDRAWN_GIFTS_QUERY, {
    variables: { take, skip },
  });

  return {
    error,
    refetch,
    loading,
    data: data?.withdrawnGifts ?? [],
  };
};
