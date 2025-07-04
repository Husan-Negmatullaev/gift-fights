import { graphql } from '@/shared/api/graphql';

export const JOIN_TO_LOBBY = graphql(`
  mutation JoinToLobby($data: JoinToLobbyInput!) {
    joinToLobby(data: $data) {
      id
      title
      status
      minBet
      maxBet
      timeToStart
      winnerId
      createdAt
      updatedAt
      participants {
        id
        user {
          id
          username
        }
      }
    }
  }
`);
