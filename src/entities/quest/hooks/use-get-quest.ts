import { graphql } from "@/shared/api/graphql";
import type {
  QuestsQuery,
  QuestsQueryVariables,
  QuestUsersQuery,
  QuestUsersQueryVariables,
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

const GET_QUEST_USERS = graphql(`
  query QuestUsers($take: Int!, $skip: Int!) {
    questUsers(take: $take, skip: $skip) {
      id
      progress
      completed
      completedAt
      lastReset
      userId
      questId
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

export const useGetQuestUsers = (args: QuestUsersQueryVariables) => {
  const { data, loading, error, refetch } = useQuery<
    QuestUsersQuery,
    QuestUsersQueryVariables
  >(GET_QUEST_USERS, {
    variables: args,
    fetchPolicy: "network-only",
  });

  return {
    questUsers: data?.questUsers ?? [],
    loading,
    error,
    refetch,
  };
}; 