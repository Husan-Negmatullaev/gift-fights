import { graphql } from '@/shared/api/graphql';
import { useQuery } from '@apollo/client';
import type {
  GetUserQuery,
  GetUserQueryVariables,
} from '@/shared/api/graphql/graphql';

const GET_USER = graphql(`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      username
      displayName
      lastName
      tonAddress
      gifts {
        id
        title
        slug
        price
      }
      withdrawnGifts {
        id
        slug
        title
        price
      }
    }
  }
`);

export const useGetUser = (id: number) => {
  const { data, loading, error, refetch } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(GET_USER, { variables: { id } });

  return {
    error,
    loading,
    refetch,
    user: data?.user,
  };
};
