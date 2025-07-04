import { useMutation } from "@apollo/client";
import { JOIN_TO_LOBBY } from "../model/graphs-gql/join-to-lobby-gql";
import type {
  JoinToLobbyMutation,
  JoinToLobbyMutationVariables,
} from "@/shared/api/graphql/graphql";

export const useJoinToLobby = () => {
  const [mutate, { data, loading, error }] = useMutation<
    JoinToLobbyMutation,
    JoinToLobbyMutationVariables
  >(JOIN_TO_LOBBY);

  const joinToLobby = (lobbyId: number, giftsIds: string[]) => {
    return mutate({
      variables: {
        data: {
          lobbyId,
          giftsIds,
        },
      },
    });
  };

  return { joinToLobby, data, loading, error };
};
