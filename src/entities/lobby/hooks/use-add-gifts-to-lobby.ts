import { useMutation } from '@apollo/client';
import { graphql } from '@/shared/api/graphql';

const ADD_GIFTS_TO_LOBBY = graphql(`
  mutation AddGiftsToLobby($data: AddGiftsToLobbyInput!) {
    addGiftsToLobby(data: $data) {
      id
      userId
      amount
      lobbyId
      createdAt
      updatedAt
      user {
        id
        username
        displayName
        image
      }
      gifts {
        id
        title
        slug
        price
        blocked
      }
    }
  }
`);

export const useAddGiftsToLobby = () => {
  const [mutate, { data, loading, error }] = useMutation(ADD_GIFTS_TO_LOBBY);

  const addGiftsToLobby = (participantId: number, giftsIds: string[]) => {
    return mutate({
      variables: {
        data: {
          participantId,
          giftsIds,
        },
      },
    });
  };

  return {
    addGiftsToLobby,
    data: data?.addGiftsToLobby,
    loading,
    error,
  };
};
