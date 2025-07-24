import { graphql } from "@/shared/api/graphql";
import type {
  QuestsQuery,
  QuestsQueryVariables,
} from "@/shared/api/graphql/graphql";
import { useQuery } from "@apollo/client";

const GET_QUESTS = graphql(`
  query Quests($take: Int!, $skip: Int!) {
    quests(take: $take, skip: $skip) {
      id
      title
      description
      type
      renewType
      isActive
      requirements
      renewInterval
      rewardId
      createdAt
      updatedAt
    }
  }
`);

export const useGetQuests = (args: QuestsQueryVariables) => {
  const { data, loading, error, refetch } = useQuery<
    QuestsQuery,
    QuestsQueryVariables
  >(GET_QUESTS, {
    variables: args,
    fetchPolicy: "network-only",
  });

  return {
    quests: data?.quests ?? [],
    loading,
    error,
    refetch,
  };
}; 