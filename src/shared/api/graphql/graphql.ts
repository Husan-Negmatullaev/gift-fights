/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
};

export type ConfirmCreationTransactionInput = {
  /** BOC */
  boc: Scalars['String']['input'];
  /** UUID v7 */
  id: Scalars['String']['input'];
};

export type CreateLobbyInput = {
  /** Maximal Bet */
  maxBet?: InputMaybe<Scalars['Float']['input']>;
  /** Minimal Bet */
  minBet?: InputMaybe<Scalars['Float']['input']>;
  /** Time to start in sec */
  timeToStart?: InputMaybe<Scalars['Int']['input']>;
  /** title */
  title: Scalars['String']['input'];
};

export type CreateTransactionInput = {
  /** Amount */
  amount: Scalars['Float']['input'];
  /** Type of transaction */
  type: TransactionType;
};

export type Gift = {
  __typename?: 'Gift';
  /** Background */
  background: Scalars['String']['output'];
  /** Background permille */
  backgroundPermille: Scalars['Int']['output'];
  /** Blocked */
  blocked: Scalars['Boolean']['output'];
  /** Created Date */
  createdAt: Scalars['DateTime']['output'];
  /** External service ID */
  externalId: Scalars['String']['output'];
  /** UUID v7 */
  id: Scalars['String']['output'];
  /** Model */
  model: Scalars['String']['output'];
  /** Message ID from external service */
  msgId: Scalars['Int']['output'];
  /** Price */
  price: Scalars['Float']['output'];
  /** Rarity permille */
  rarityPermille: Scalars['Int']['output'];
  /** Slug */
  slug: Scalars['String']['output'];
  /** Symbol */
  symbol: Scalars['String']['output'];
  /** Symbol permille */
  symbolPermille: Scalars['Int']['output'];
  /** Title */
  title: Scalars['String']['output'];
  /** Updated Date */
  updatedAt: Scalars['DateTime']['output'];
  /** Owner */
  user: User;
  /** User telegram ID */
  userId: Scalars['String']['output'];
};

export type IntegrateTonWalletToUserInput = {
  /** Ton Address */
  address: Scalars['String']['input'];
};

export type JoinToLobbyInput = {
  /** Gifts UUIDs v7 */
  giftsIds: Array<Scalars['String']['input']>;
  /** Lobby ID */
  lobbyId: Scalars['Int']['input'];
};

export type LeaderboardRow = {
  __typename?: 'LeaderboardRow';
  /** Rank */
  rank?: Maybe<Scalars['Int']['output']>;
  /** Score */
  score?: Maybe<Scalars['Int']['output']>;
  /** User */
  user: User;
  /** User ID */
  userId: Scalars['Int']['output'];
};

export type Lobby = {
  __typename?: 'Lobby';
  /** Created Date */
  createdAt: Scalars['DateTime']['output'];
  /** ID */
  id: Scalars['Int']['output'];
  /** Maximal Bet */
  maxBet?: Maybe<Scalars['Float']['output']>;
  /** Minimal Bet */
  minBet?: Maybe<Scalars['Float']['output']>;
  /** Participants List */
  participants: Array<Participant>;
  /** Status of lobby */
  status: LobbyStatus;
  /** Time to start */
  timeToStart: Scalars['Int']['output'];
  /** Title */
  title: Scalars['String']['output'];
  /** Updated Date */
  updatedAt: Scalars['DateTime']['output'];
  /** Winner */
  winner?: Maybe<User>;
  /** Winner ID */
  winnerId?: Maybe<Scalars['Int']['output']>;
};

export enum LobbyStatus {
  Completed = 'Completed',
  Countdown = 'Countdown',
  InProcess = 'InProcess',
  WaitingForPlayers = 'WaitingForPlayers',
}

export type Mutation = {
  __typename?: 'Mutation';
  confirmCreationTransaction: Transaction;
  createLobby: Lobby;
  createTransaction: Transaction;
  integrateTonWalletToUser: User;
  joinToLobby: Lobby;
  withdrawGifts: Array<Gift>;
};

export type MutationConfirmCreationTransactionArgs = {
  data: ConfirmCreationTransactionInput;
};

export type MutationCreateLobbyArgs = {
  data: CreateLobbyInput;
};

export type MutationCreateTransactionArgs = {
  data: CreateTransactionInput;
};

export type MutationIntegrateTonWalletToUserArgs = {
  data: IntegrateTonWalletToUserInput;
};

export type MutationJoinToLobbyArgs = {
  data: JoinToLobbyInput;
};

export type MutationWithdrawGiftsArgs = {
  data: WithdrawGiftInput;
};

export type Participant = {
  __typename?: 'Participant';
  /** Amount */
  amount: Scalars['Int']['output'];
  /** Created Date */
  createdAt: Scalars['DateTime']['output'];
  /** Gifts */
  gifts: Array<Gift>;
  /** ID */
  id: Scalars['Int']['output'];
  /** Lobby */
  lobby: Lobby;
  /** Lobby ID */
  lobbyId: Scalars['Int']['output'];
  /** Updated Date */
  updatedAt: Scalars['DateTime']['output'];
  /** User */
  user: User;
  /** User ID */
  userId: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  gift: Gift;
  gifts: Array<Gift>;
  leaderboard: Array<LeaderboardRow>;
  lobbies: Array<Lobby>;
  lobby: Lobby;
  myScore: LeaderboardRow;
  participant: Participant;
  profile: User;
  transaction: Transaction;
  transactions: Array<Transaction>;
  user: User;
  users: Array<User>;
  withdrawnGift: WithdrawnGift;
  withdrawnGifts: Array<WithdrawnGift>;
};

export type QueryGiftArgs = {
  id: Scalars['String']['input'];
};

export type QueryGiftsArgs = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type QueryLeaderboardArgs = {
  end?: Scalars['Int']['input'];
  start: Scalars['Int']['input'];
};

export type QueryLobbiesArgs = {
  skip: Scalars['Int']['input'];
  status?: InputMaybe<LobbyStatus>;
  take: Scalars['Int']['input'];
};

export type QueryLobbyArgs = {
  id: Scalars['Int']['input'];
};

export type QueryParticipantArgs = {
  id: Scalars['Int']['input'];
};

export type QueryTransactionArgs = {
  id: Scalars['Int']['input'];
};

export type QueryTransactionsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type QueryUsersArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type QueryWithdrawnGiftArgs = {
  id: Scalars['Int']['input'];
};

export type QueryWithdrawnGiftsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  /** Amount */
  amount: Scalars['Float']['output'];
  /** Created Date */
  createdAt: Scalars['DateTime']['output'];
  /** Destination wallet */
  from: Scalars['String']['output'];
  /** Hash of transaction */
  hash: Scalars['String']['output'];
  /** UUID v7 */
  id: Scalars['String']['output'];
  /** Type of transaction */
  status: TransactionStatus;
  /** Source wallet */
  to: Scalars['String']['output'];
  /** Type of transaction */
  type: TransactionType;
  /** Updated Date */
  updatedAt: Scalars['DateTime']['output'];
  /** Owner */
  user: User;
  /** User ID */
  userId: Scalars['Int']['output'];
};

export enum TransactionStatus {
  Confirmed = 'Confirmed',
  Draft = 'Draft',
  Failed = 'Failed',
  Pending = 'Pending',
}

export enum TransactionType {
  WalletTopUp = 'wallet_top_up',
  WalletWithdrawal = 'wallet_withdrawal',
}

export type User = {
  __typename?: 'User';
  /** Balance */
  balance: Scalars['Float']['output'];
  /** Created Date */
  createdAt: Scalars['DateTime']['output'];
  /** Display Name */
  displayName: Scalars['String']['output'];
  /** First Name */
  firstName: Scalars['String']['output'];
  /** User's gifts */
  gifts: Array<Gift>;
  /** ID */
  id: Scalars['Int']['output'];
  /** Last Name */
  lastName: Scalars['String']['output'];
  /** Lost games count */
  losses?: Maybe<Scalars['Int']['output']>;
  /** User's participated lobbies */
  participation: Array<Participant>;
  /** Referral code */
  referralCode: Scalars['String']['output'];
  /** Referral users */
  referrals: Array<User>;
  /** Referred by */
  referredBy?: Maybe<Scalars['String']['output']>;
  /** Referrer */
  referrer?: Maybe<User>;
  /** Telegram ID */
  tgId: Scalars['String']['output'];
  /** Ton wallet address */
  tonAddress?: Maybe<Scalars['String']['output']>;
  /** User's transactions */
  transactions: Array<Transaction>;
  /** Updated Date */
  updatedAt: Scalars['DateTime']['output'];
  /** Telegram User Name */
  username: Scalars['String']['output'];
  /** Win rate */
  winRate?: Maybe<Scalars['Float']['output']>;
  /** Won games count */
  wins?: Maybe<Scalars['Int']['output']>;
  withdrawnGifts: Array<WithdrawnGift>;
  /** User's won lobbies */
  wonGames: Array<Lobby>;
};

export type WithdrawGiftInput = {
  /** Gifts UUIDs v7 */
  giftsIds: Array<Scalars['String']['input']>;
  /** Transaction UUIDs v7 */
  transactionId: Scalars['String']['input'];
};

export type WithdrawnGift = {
  __typename?: 'WithdrawnGift';
  /** Background */
  background: Scalars['String']['output'];
  /** Background permille */
  backgroundPermille: Scalars['Int']['output'];
  /** Created Date */
  createdAt: Scalars['DateTime']['output'];
  /** External service ID */
  externalId: Scalars['String']['output'];
  /** UUID v7 */
  id: Scalars['String']['output'];
  /** Model */
  model: Scalars['String']['output'];
  /** Message ID from external service */
  msgId: Scalars['Int']['output'];
  /** Price */
  price: Scalars['Float']['output'];
  /** Rarity permille */
  rarityPermille: Scalars['Int']['output'];
  /** Slug */
  slug: Scalars['String']['output'];
  /** Symbol */
  symbol: Scalars['String']['output'];
  /** Symbol permille */
  symbolPermille: Scalars['Int']['output'];
  /** Title */
  title: Scalars['String']['output'];
  /** Transaction */
  transaction: Transaction;
  /** Transaction ID */
  transactionId: Scalars['String']['output'];
  /** Updated Date */
  updatedAt: Scalars['DateTime']['output'];
  /** Owner */
  user: User;
  /** User telegram ID */
  userId: Scalars['String']['output'];
};

export type GetGiftsQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
}>;

export type GetGiftsQuery = {
  __typename?: 'Query';
  gifts: Array<{
    __typename?: 'Gift';
    id: string;
    slug: string;
    msgId: number;
    title: string;
    model: string;
    price: number;
    symbol: string;
    userId: string;
    blocked: boolean;
    externalId: string;
    symbolPermille: number;
    rarityPermille: number;
    backgroundPermille: number;
  }>;
};

export type GetLobbiesQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  status?: InputMaybe<LobbyStatus>;
}>;

export type GetLobbiesQuery = {
  __typename?: 'Query';
  lobbies: Array<{
    __typename?: 'Lobby';
    id: number;
    title: string;
    status: LobbyStatus;
    minBet?: number | null;
    maxBet?: number | null;
    createdAt: any;
    updatedAt: any;
    timeToStart: number;
  }>;
};

export type GetLobbyQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type GetLobbyQuery = {
  __typename?: 'Query';
  lobby: {
    __typename?: 'Lobby';
    id: number;
    title: string;
    status: LobbyStatus;
    minBet?: number | null;
    maxBet?: number | null;
    timeToStart: number;
    winnerId?: number | null;
    createdAt: any;
    updatedAt: any;
    participants: Array<{
      __typename?: 'Participant';
      id: number;
      userId: number;
      amount: number;
      user: { __typename?: 'User'; username: string };
      gifts: Array<{
        __typename?: 'Gift';
        id: string;
        price: number;
        slug: string;
      }>;
    }>;
  };
};

export type JoinToLobbyMutationVariables = Exact<{
  data: JoinToLobbyInput;
}>;

export type JoinToLobbyMutation = {
  __typename?: 'Mutation';
  joinToLobby: {
    __typename?: 'Lobby';
    id: number;
    title: string;
    status: LobbyStatus;
    minBet?: number | null;
    maxBet?: number | null;
    timeToStart: number;
    winnerId?: number | null;
    createdAt: any;
    updatedAt: any;
    participants: Array<{
      __typename?: 'Participant';
      id: number;
      user: { __typename?: 'User'; id: number; username: string };
    }>;
  };
};

export type IntegrateTonWalletToUserMutationVariables = Exact<{
  data: IntegrateTonWalletToUserInput;
}>;

export type IntegrateTonWalletToUserMutation = {
  __typename?: 'Mutation';
  integrateTonWalletToUser: {
    __typename?: 'User';
    id: number;
    tgId: string;
    username: string;
    firstName: string;
    lastName: string;
    tonAddress?: string | null;
    balance: number;
    createdAt: any;
    updatedAt: any;
  };
};

export type CreateTransactionMutationVariables = Exact<{
  data: CreateTransactionInput;
}>;

export type CreateTransactionMutation = {
  __typename?: 'Mutation';
  createTransaction: {
    __typename?: 'Transaction';
    id: string;
    to: string;
    from: string;
    hash: string;
    type: TransactionType;
    status: TransactionStatus;
    amount: number;
    userId: number;
    createdAt: any;
    updatedAt: any;
  };
};

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type GetUserQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'User';
    id: number;
    username: string;
    displayName: string;
    lastName: string;
    tonAddress?: string | null;
    gifts: Array<{
      __typename?: 'Gift';
      id: string;
      title: string;
      slug: string;
      price: number;
    }>;
    withdrawnGifts: Array<{
      __typename?: 'WithdrawnGift';
      id: string;
      slug: string;
      title: string;
      price: number;
    }>;
  };
};

export type ProfileQueryVariables = Exact<{ [key: string]: never }>;

export type ProfileQuery = {
  __typename?: 'Query';
  profile: {
    __typename?: 'User';
    id: number;
    tgId: string;
    username: string;
    lastName: string;
    firstName: string;
    tonAddress?: string | null;
    referralCode: string;
    referredBy?: string | null;
    balance: number;
    displayName: string;
    createdAt: any;
    updatedAt: any;
    wonGames: Array<{ __typename?: 'Lobby'; id: number }>;
    withdrawnGifts: Array<{ __typename?: 'WithdrawnGift'; id: string }>;
  };
};

export const GetGiftsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGifts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'blocked' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'gifts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'blocked' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'blocked' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'msgId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'model' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                { kind: 'Field', name: { kind: 'Name', value: 'symbol' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'blocked' } },
                { kind: 'Field', name: { kind: 'Name', value: 'externalId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'symbolPermille' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rarityPermille' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'backgroundPermille' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetGiftsQuery, GetGiftsQueryVariables>;
export const GetLobbiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLobbies' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'take' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'status' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'LobbyStatus' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'lobbies' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'take' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'take' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'skip' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skip' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'status' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'status' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'minBet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxBet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timeToStart' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetLobbiesQuery, GetLobbiesQueryVariables>;
export const GetLobbyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLobby' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'lobby' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'minBet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxBet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timeToStart' } },
                { kind: 'Field', name: { kind: 'Name', value: 'winnerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'participants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'userId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'username' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gifts' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slug' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetLobbyQuery, GetLobbyQueryVariables>;
export const JoinToLobbyDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'JoinToLobby' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'JoinToLobbyInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'joinToLobby' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'minBet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'maxBet' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timeToStart' } },
                { kind: 'Field', name: { kind: 'Name', value: 'winnerId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'participants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'user' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'username' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JoinToLobbyMutation, JoinToLobbyMutationVariables>;
export const IntegrateTonWalletToUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'IntegrateTonWalletToUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'IntegrateTonWalletToUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'integrateTonWalletToUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tgId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tonAddress' } },
                { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  IntegrateTonWalletToUserMutation,
  IntegrateTonWalletToUserMutationVariables
>;
export const CreateTransactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateTransaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateTransactionInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createTransaction' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'to' } },
                { kind: 'Field', name: { kind: 'Name', value: 'from' } },
                { kind: 'Field', name: { kind: 'Name', value: 'hash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateTransactionMutation,
  CreateTransactionMutationVariables
>;
export const GetUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tonAddress' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'gifts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'withdrawnGifts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const ProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Profile' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tgId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'tonAddress' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'referralCode' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'referredBy' } },
                { kind: 'Field', name: { kind: 'Name', value: 'balance' } },
                { kind: 'Field', name: { kind: 'Name', value: 'displayName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'wonGames' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'withdrawnGifts' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
