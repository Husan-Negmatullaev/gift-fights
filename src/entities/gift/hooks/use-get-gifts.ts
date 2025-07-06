import { graphql } from "@/shared/api/graphql";
import { useQuery } from "@apollo/client";
import type {
  GetGiftsQuery,
  GetGiftsQueryVariables,
} from "@/shared/api/graphql/graphql";

const GET_GIFTS = graphql(`
  query GetGifts(
    $take: Int!
    $skip: Int!
    $userId: String
    $min: Float
    $max: Float
    $blocked: Boolean
  ) {
    gifts(
      take: $take
      skip: $skip
      userId: $userId
      min: $min
      max: $max
      blocked: $blocked
    ) {
      id
      slug
      msgId
      title
      model
      price
      symbol
      userId
      blocked
      externalId
      symbolPermille
      rarityPermille
      backgroundPermille
    }
  }
`);

export const useGetGifts = (
  take: number,
  skip: number,
  userId?: string,
  min?: number,
  max?: number,
  blocked?: boolean,
) => {
  const { data, loading, error, refetch } = useQuery<
    GetGiftsQuery,
    GetGiftsQueryVariables
  >(GET_GIFTS, {
    variables: { take, skip, userId, min, max, blocked },
    fetchPolicy: "network-only",
  });

  return {
    gifts: data?.gifts ?? [],
    loading,
    error,
    refetch,
  };
};
