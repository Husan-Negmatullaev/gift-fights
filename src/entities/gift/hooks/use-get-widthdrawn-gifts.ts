import { graphql } from '@/shared/api/graphql';
import type {
  WithdrawnGiftsQuery,
  WithdrawnGiftsQueryVariables,
} from '@/shared/api/graphql/graphql';
import { useQuery } from '@apollo/client';

const GET_WITHDRAWN_GIFTS_QUERY = graphql(`
  query WithdrawnGifts($take: Int!, $skip: Int!) {
    withdrawnGifts(take: $take, skip: $skip) {
      status
      transactionId
      userId
      giftId
    }
  }
`);

export const useGetWithdrawnGifts = (take: number, skip: number) => {
  const { data, loading, error, refetch } = useQuery<
    WithdrawnGiftsQuery,
    WithdrawnGiftsQueryVariables
  >(GET_WITHDRAWN_GIFTS_QUERY, {
    variables: { take, skip },
    pollInterval: 5000,
  });

  return {
    error,
    refetch,
    loading,
    data: data?.withdrawnGifts ?? [],
  };
};
