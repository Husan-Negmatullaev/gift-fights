import { graphql } from '@/shared/api/graphql';
import type { Gift, Lobby } from '@/shared/api/graphql/graphql';
import { useQuery } from '@apollo/client';

// Define the participant type with gifts and lobby (without user field)
export interface ParticipantWithRelations {
  id: number;
  amount: number;
  userId: number;
  lobbyId: number;
  createdAt: any;
  updatedAt: any;
  gifts: Gift[];
  lobby: Lobby;
}

const GET_PARTICIPANTS = graphql(`
  query Participants($take: Int!, $skip: Int!) {
    participants(take: $take, skip: $skip) {
      id
      amount
      userId
      lobbyId
      createdAt
      updatedAt
      gifts {
        id
        title
        slug
        model
        symbol
        background
        blocked
        withdrawn
        withdrawable
        place
        isReward
        rewardWasTransferred
        price
        symbolPermille
        rarityPermille
        backgroundPermille
        msgId
        externalId
        userId
        createdAt
        updatedAt
      }
      lobby {
        id
        title
        status
        minBet
        maxBet
        timeToStart
        winnerId
        countdownExpiresAt
        createdAt
        updatedAt
        participants {
                id
                amount
                userId
                lobbyId
                createdAt
                updatedAt
            }
      }
    }
  }
`);

export const useGetParticipants = (args: { take: number; skip: number }) => {
  const { data, loading, error, refetch } = useQuery(GET_PARTICIPANTS, {
    variables: args,
    fetchPolicy: 'network-only',
  });

  const participants = (data?.participants ?? []) as ParticipantWithRelations[];

  return {
    participants,
    loading,
    error,
    refetch,
  };
}; 