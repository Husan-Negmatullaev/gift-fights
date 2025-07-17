import { graphql } from "@/shared/api/graphql";
import type {
  GetGiftsQuery,
  GetGiftsQueryVariables,
} from "@/shared/api/graphql/graphql";
import { useQuery } from "@apollo/client";

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

export const useGetGifts = (args: GetGiftsQueryVariables) => {
  const { data, loading, error, refetch } = useQuery<
    GetGiftsQuery,
    GetGiftsQueryVariables
  >(GET_GIFTS, {
    variables: args,
    fetchPolicy: "network-only",
    pollInterval: 5000,
  });

  return {
    gifts: data?.gifts ?? [],
    loading,
    error,
    refetch,
  };
};
