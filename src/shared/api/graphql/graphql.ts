/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
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
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type ConfirmCreationTransactionInput = {
  boc: Scalars["String"]["input"];
  id: Scalars["String"]["input"];
};

export type CreateGiftInput = {
  background: Scalars["String"]["input"];
  backgroundPermille: Scalars["Int"]["input"];
  externalId: Scalars["String"]["input"];
  model: Scalars["String"]["input"];
  msgId: Scalars["Int"]["input"];
  price: Scalars["Float"]["input"];
  rarityPermille: Scalars["Int"]["input"];
  slug: Scalars["String"]["input"];
  symbol: Scalars["String"]["input"];
  symbolPermille: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateLobbyInput = {
  maxBet?: InputMaybe<Scalars["Float"]["input"]>;
  minBet?: InputMaybe<Scalars["Float"]["input"]>;
  timeToStart?: InputMaybe<Scalars["Int"]["input"]>;
  title: Scalars["String"]["input"];
};

export type CreateTransactionInput = {
  amount: Scalars["Float"]["input"];
  type: TransactionType;
};

export type Gift = {
  __typename?: "Gift";
  background: Scalars["String"]["output"];
  backgroundPermille: Scalars["Int"]["output"];
  blocked: Scalars["Boolean"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  externalId: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  model: Scalars["String"]["output"];
  msgId: Scalars["Int"]["output"];
  price: Scalars["Float"]["output"];
  rarityPermille: Scalars["Int"]["output"];
  slug: Scalars["String"]["output"];
  symbol: Scalars["String"]["output"];
  symbolPermille: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["String"]["output"];
};

export type IntegrateTonWalletToUserInput = {
  address: Scalars["String"]["input"];
};

export type JoinToLobbyInput = {
  giftsIds: Array<Scalars["String"]["input"]>;
  lobbyId: Scalars["Int"]["input"];
};

export type LeaderboardRow = {
  __typename?: "LeaderboardRow";
  rank?: Maybe<Scalars["Int"]["output"]>;
  score?: Maybe<Scalars["Int"]["output"]>;
  user: User;
  userId: Scalars["Int"]["output"];
};

export type Lobby = {
  __typename?: "Lobby";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["Int"]["output"];
  maxBet?: Maybe<Scalars["Float"]["output"]>;
  minBet?: Maybe<Scalars["Float"]["output"]>;
  participants: Array<Participant>;
  status: LobbyStatus;
  timeToStart: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  winner?: Maybe<User>;
  winnerId?: Maybe<Scalars["Int"]["output"]>;
};

export enum LobbyStatus {
  Completed = "Completed",
  Countdown = "Countdown",
  InProcess = "InProcess",
  WaitingForPlayers = "WaitingForPlayers",
}

export type Mutation = {
  __typename?: "Mutation";
  confirmCreationTransaction: Transaction;
  createGift: Gift;
  createLobby: Lobby;
  createTransaction: Transaction;
  integrateTonWalletToUser: User;
  joinToLobby: Lobby;
  withdrawGifts: Array<Gift>;
};

export type MutationConfirmCreationTransactionArgs = {
  data: ConfirmCreationTransactionInput;
};

export type MutationCreateGiftArgs = {
  data: CreateGiftInput;
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
  __typename?: "Participant";
  amount: Scalars["Int"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  gifts: Array<Gift>;
  id: Scalars["Int"]["output"];
  lobby: Lobby;
  lobbyId: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  gift: Gift;
  gifts: Array<Gift>;
  leaderboard: Array<LeaderboardRow>;
  lobbies: Array<Lobby>;
  lobby: Lobby;
  myScore: LeaderboardRow;
  participant: Participant;
  profile: User;
  rewards: Array<Gift>;
  transaction: Transaction;
  transactions: Array<Transaction>;
  user: User;
  users: Array<User>;
  withdrawnGift: WithdrawnGift;
  withdrawnGifts: Array<WithdrawnGift>;
};

export type QueryGiftArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGiftsArgs = {
  blocked?: InputMaybe<Scalars["Boolean"]["input"]>;
  max?: InputMaybe<Scalars["Float"]["input"]>;
  min?: InputMaybe<Scalars["Float"]["input"]>;
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
  userId?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryLeaderboardArgs = {
  end?: Scalars["Int"]["input"];
  start: Scalars["Int"]["input"];
};

export type QueryLobbiesArgs = {
  skip: Scalars["Int"]["input"];
  status?: InputMaybe<Array<LobbyStatus>>;
  take: Scalars["Int"]["input"];
};

export type QueryLobbyArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryParticipantArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryTransactionArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryTransactionsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type QueryUserArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryUsersArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type QueryWithdrawnGiftArgs = {
  id: Scalars["Int"]["input"];
};

export type QueryWithdrawnGiftsArgs = {
  skip: Scalars["Int"]["input"];
  take: Scalars["Int"]["input"];
};

export type Transaction = {
  __typename?: "Transaction";
  amount: Scalars["Float"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  from: Scalars["String"]["output"];
  hash: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  status: TransactionStatus;
  to: Scalars["String"]["output"];
  type: TransactionType;
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["Int"]["output"];
};

export enum TransactionStatus {
  Confirmed = "Confirmed",
  Draft = "Draft",
  Failed = "Failed",
  Pending = "Pending",
}

export enum TransactionType {
  WalletTopUp = "wallet_top_up",
  WalletWithdrawal = "wallet_withdrawal",
}

export type User = {
  __typename?: "User";
  balance: Scalars["Float"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  displayName: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  gifts: Array<Gift>;
  id: Scalars["Int"]["output"];
  image?: Maybe<Scalars["String"]["output"]>;
  lastName: Scalars["String"]["output"];
  losses?: Maybe<Scalars["Int"]["output"]>;
  participation: Array<Participant>;
  referralCode: Scalars["String"]["output"];
  referrals: Array<User>;
  referredBy?: Maybe<Scalars["String"]["output"]>;
  referrer?: Maybe<User>;
  tgId: Scalars["String"]["output"];
  tonAddress?: Maybe<Scalars["String"]["output"]>;
  transactions: Array<Transaction>;
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
  winRate?: Maybe<Scalars["Float"]["output"]>;
  wins?: Maybe<Scalars["Int"]["output"]>;
  withdrawnGifts: Array<WithdrawnGift>;
  wonGames: Array<Lobby>;
};

export type WithdrawGiftInput = {
  giftsIds: Array<Scalars["String"]["input"]>;
  transactionId: Scalars["String"]["input"];
};

export type WithdrawnGift = {
  __typename?: "WithdrawnGift";
  background: Scalars["String"]["output"];
  backgroundPermille: Scalars["Int"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  externalId: Scalars["String"]["output"];
  id: Scalars["String"]["output"];
  model: Scalars["String"]["output"];
  msgId: Scalars["Int"]["output"];
  price: Scalars["Float"]["output"];
  rarityPermille: Scalars["Int"]["output"];
  slug: Scalars["String"]["output"];
  symbol: Scalars["String"]["output"];
  symbolPermille: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  transaction: Transaction;
  transactionId: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  user: User;
  userId: Scalars["String"]["output"];
};

export type GetGiftsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  userId?: InputMaybe<Scalars["String"]["input"]>;
  min?: InputMaybe<Scalars["Float"]["input"]>;
  max?: InputMaybe<Scalars["Float"]["input"]>;
  blocked?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type GetGiftsQuery = {
  __typename?: "Query";
  gifts: Array<{
    __typename?: "Gift";
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

export type WithdrawnGiftsQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
}>;

export type WithdrawnGiftsQuery = {
  __typename?: "Query";
  withdrawnGifts: Array<{
    __typename?: "WithdrawnGift";
    id: string;
    slug: string;
    title: string;
    price: number;
  }>;
};

export type GetLeaderboardQueryVariables = Exact<{
  start: Scalars["Int"]["input"];
  end: Scalars["Int"]["input"];
}>;

export type GetLeaderboardQuery = {
  __typename?: "Query";
  leaderboard: Array<{
    __typename?: "LeaderboardRow";
    userId: number;
    score?: number | null;
    rank?: number | null;
    user: { __typename?: "User"; image?: string | null; username: string };
  }>;
};

export type MyScoreQueryVariables = Exact<{ [key: string]: never }>;

export type MyScoreQuery = {
  __typename?: "Query";
  myScore: {
    __typename?: "LeaderboardRow";
    userId: number;
    score?: number | null;
    rank?: number | null;
    user: { __typename?: "User"; username: string };
  };
};

export type GetRewardsQueryVariables = Exact<{ [key: string]: never }>;

export type GetRewardsQuery = {
  __typename?: "Query";
  rewards: Array<{
    __typename?: "Gift";
    id: string;
    slug: string;
    title: string;
    user: { __typename?: "User"; image?: string | null; displayName: string };
  }>;
};

export type GetLobbiesQueryVariables = Exact<{
  take: Scalars["Int"]["input"];
  skip: Scalars["Int"]["input"];
  status?: InputMaybe<Array<LobbyStatus> | LobbyStatus>;
}>;

export type GetLobbiesQuery = {
  __typename?: "Query";
  lobbies: Array<{
    __typename?: "Lobby";
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
  id: Scalars["Int"]["input"];
}>;

export type GetLobbyQuery = {
  __typename?: "Query";
  lobby: {
    __typename?: "Lobby";
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
      __typename?: "Participant";
      id: number;
      userId: number;
      amount: number;
      user: { __typename?: "User"; image?: string | null; username: string };
      gifts: Array<{
        __typename?: "Gift";
        id: string;
        slug: string;
        price: number;
        blocked: boolean;
      }>;
    }>;
  };
};

export type JoinToLobbyMutationVariables = Exact<{
  data: JoinToLobbyInput;
}>;

export type JoinToLobbyMutation = {
  __typename?: "Mutation";
  joinToLobby: {
    __typename?: "Lobby";
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
      __typename?: "Participant";
      id: number;
      user: { __typename?: "User"; id: number; username: string };
    }>;
  };
};

export type ProfileQueryVariables = Exact<{ [key: string]: never }>;

export type ProfileQuery = {
  __typename?: "Query";
  profile: {
    __typename?: "User";
    id: number;
    tgId: string;
    image?: string | null;
    username: string;
    lastName: string;
    firstName: string;
    tonAddress?: string | null;
    referralCode: string;
    referredBy?: string | null;
    balance: number;
    displayName: string;
    winRate?: number | null;
    wins?: number | null;
    losses?: number | null;
    withdrawnGifts: Array<{
      __typename?: "WithdrawnGift";
      id: string;
      slug: string;
      price: number;
      title: string;
    }>;
  };
};

export type IntegrateTonWalletToUserMutationVariables = Exact<{
  data: IntegrateTonWalletToUserInput;
}>;

export type IntegrateTonWalletToUserMutation = {
  __typename?: "Mutation";
  integrateTonWalletToUser: {
    __typename?: "User";
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
  __typename?: "Mutation";
  createTransaction: {
    __typename?: "Transaction";
    id: string;
    to: string;
    hash: string;
    type: TransactionType;
    from: string;
    status: TransactionStatus;
    amount: number;
    userId: number;
  };
};

export type GetUserQueryVariables = Exact<{
  id: Scalars["Int"]["input"];
}>;

export type GetUserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: number;
    username: string;
    displayName: string;
    lastName: string;
    tonAddress?: string | null;
    gifts: Array<{
      __typename?: "Gift";
      id: string;
      title: string;
      slug: string;
      price: number;
    }>;
    withdrawnGifts: Array<{
      __typename?: "WithdrawnGift";
      id: string;
      slug: string;
      title: string;
      price: number;
    }>;
  };
};

export const GetGiftsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetGifts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "min" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "max" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "blocked" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "gifts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "userId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "userId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "min" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "min" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "max" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "max" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "blocked" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "blocked" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "msgId" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "model" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "symbol" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "blocked" } },
                { kind: "Field", name: { kind: "Name", value: "externalId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "symbolPermille" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "rarityPermille" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "backgroundPermille" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetGiftsQuery, GetGiftsQueryVariables>;
export const WithdrawnGiftsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "WithdrawnGifts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "withdrawnGifts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<WithdrawnGiftsQuery, WithdrawnGiftsQueryVariables>;
export const GetLeaderboardDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetLeaderboard" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "start" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "end" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "leaderboard" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "start" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "start" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "end" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "end" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "score" } },
                { kind: "Field", name: { kind: "Name", value: "rank" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "image" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
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
} as unknown as DocumentNode<GetLeaderboardQuery, GetLeaderboardQueryVariables>;
export const MyScoreDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MyScore" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myScore" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "userId" } },
                { kind: "Field", name: { kind: "Name", value: "score" } },
                { kind: "Field", name: { kind: "Name", value: "rank" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
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
} as unknown as DocumentNode<MyScoreQuery, MyScoreQueryVariables>;
export const GetRewardsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetRewards" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "rewards" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "image" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "displayName" },
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
} as unknown as DocumentNode<GetRewardsQuery, GetRewardsQueryVariables>;
export const GetLobbiesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetLobbies" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "status" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "LobbyStatus" },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "lobbies" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "take" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "take" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skip" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "skip" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "status" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "status" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "minBet" } },
                { kind: "Field", name: { kind: "Name", value: "maxBet" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                { kind: "Field", name: { kind: "Name", value: "timeToStart" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetLobbiesQuery, GetLobbiesQueryVariables>;
export const GetLobbyDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetLobby" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "lobby" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "minBet" } },
                { kind: "Field", name: { kind: "Name", value: "maxBet" } },
                { kind: "Field", name: { kind: "Name", value: "timeToStart" } },
                { kind: "Field", name: { kind: "Name", value: "winnerId" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "participants" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "userId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "amount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "image" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "username" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gifts" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "slug" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "price" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "blocked" },
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
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "JoinToLobby" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "JoinToLobbyInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "joinToLobby" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "minBet" } },
                { kind: "Field", name: { kind: "Name", value: "maxBet" } },
                { kind: "Field", name: { kind: "Name", value: "timeToStart" } },
                { kind: "Field", name: { kind: "Name", value: "winnerId" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "participants" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "username" },
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
export const ProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Profile" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "profile" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "tgId" } },
                { kind: "Field", name: { kind: "Name", value: "image" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "tonAddress" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "referralCode" },
                },
                { kind: "Field", name: { kind: "Name", value: "referredBy" } },
                { kind: "Field", name: { kind: "Name", value: "balance" } },
                { kind: "Field", name: { kind: "Name", value: "displayName" } },
                { kind: "Field", name: { kind: "Name", value: "winRate" } },
                { kind: "Field", name: { kind: "Name", value: "wins" } },
                { kind: "Field", name: { kind: "Name", value: "losses" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "withdrawnGifts" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
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
} as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const IntegrateTonWalletToUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "IntegrateTonWalletToUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "IntegrateTonWalletToUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "integrateTonWalletToUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "tgId" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "tonAddress" } },
                { kind: "Field", name: { kind: "Name", value: "balance" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
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
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateTransaction" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateTransactionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTransaction" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "to" } },
                { kind: "Field", name: { kind: "Name", value: "hash" } },
                { kind: "Field", name: { kind: "Name", value: "type" } },
                { kind: "Field", name: { kind: "Name", value: "from" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "amount" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
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
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "displayName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "tonAddress" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "gifts" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "withdrawnGifts" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
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
