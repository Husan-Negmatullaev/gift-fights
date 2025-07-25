/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type AddGiftsToLobbyInput = {
  /** Gifts UUIDs v7 */
  giftsIds: Array<Scalars['String']['input']>;
  /** Participant ID */
  participantId: Scalars['Int']['input'];
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

export type CreateQuestInput = {
  /** Description */
  description: Scalars['String']['input'];
  /** Is active */
  isActive: Scalars['Boolean']['input'];
  /** In seconds, if type is renew type custom */
  renewInterval?: InputMaybe<Scalars['Int']['input']>;
  /** Renew type */
  renewType: RenewType;
  /** Type */
  requirements: RequirementsInput;
  /** Title */
  title: Scalars['String']['input'];
  /** Type */
  type: QuestType;
};

export type CreateTransactionInput = {
  /** Amount */
  amount: Scalars['Float']['input'];
  /** Type of transaction */
  type: TransactionType;
};

export type CreateWithdrawRequestInput = {
  /** Amount */
  amount: Scalars['Float']['input'];
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
  /** Is reward */
  isReward: Scalars['Boolean']['output'];
  /** Model */
  model: Scalars['String']['output'];
  /** Message ID from external service */
  msgId: Scalars['String']['output'];
  /** Place */
  place?: Maybe<Place>;
  /** Price */
  price: Scalars['Float']['output'];
  /** Rarity permille */
  rarityPermille: Scalars['Int']['output'];
  /** Reward was transferred */
  rewardWasTransferred: Scalars['Boolean']['output'];
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
  user?: Maybe<User>;
  /** User telegram ID */
  userId?: Maybe<Scalars['String']['output']>;
  /** Withdrawable */
  withdrawable: Scalars['Boolean']['output'];
  /** Withdrawn */
  withdrawn: Scalars['Boolean']['output'];
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

export type LeaderboardInfo = {
  __typename?: 'LeaderboardInfo';
  /** Created Date */
  createdAt: Scalars['DateTime']['output'];
  /** Created Date */
  endDate: Scalars['DateTime']['output'];
  /** UUID v7 */
  id: Scalars['String']['output'];
  /** Created Date */
  startDate: Scalars['DateTime']['output'];
  /** Status */
  status: LeaderboardStatus;
  /** Updated Date */
  updatedAt: Scalars['DateTime']['output'];
};

export type LeaderboardRow = {
  __typename?: 'LeaderboardRow';
  /** Rank */
  rank?: Maybe<Scalars['Int']['output']>;
  /** Score */
  score?: Maybe<Scalars['Float']['output']>;
  /** User */
  user: User;
  /** User ID */
  userId: Scalars['Int']['output'];
};

export enum LeaderboardStatus {
  Completed = 'Completed',
  IsPending = 'IsPending'
}

export type Lobby = {
  __typename?: 'Lobby';
  /** Countdown expires Date */
  countdownExpiresAt?: Maybe<Scalars['DateTime']['output']>;
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
  WaitingForPlayers = 'WaitingForPlayers'
}

export type Mutation = {
  __typename?: 'Mutation';
  addGiftsToLobby: Participant;
  claimReward: QuestUser;
  confirmCreationTransaction: Transaction;
  createLobby: Lobby;
  createQuest: Quest;
  createTransaction: Transaction;
  createWithdrawRequest: WithdrawRequest;
  integrateTonWalletToUser: User;
  joinToLobby: Lobby;
  updateQuest: Quest;
  withdrawGifts: Array<Gift>;
};


export type MutationAddGiftsToLobbyArgs = {
  data: AddGiftsToLobbyInput;
};


export type MutationClaimRewardArgs = {
  questId: Scalars['Int']['input'];
};


export type MutationConfirmCreationTransactionArgs = {
  data: ConfirmCreationTransactionInput;
};


export type MutationCreateLobbyArgs = {
  data: CreateLobbyInput;
};


export type MutationCreateQuestArgs = {
  data: CreateQuestInput;
};


export type MutationCreateTransactionArgs = {
  data: CreateTransactionInput;
};


export type MutationCreateWithdrawRequestArgs = {
  data: CreateWithdrawRequestInput;
};


export type MutationIntegrateTonWalletToUserArgs = {
  data: IntegrateTonWalletToUserInput;
};


export type MutationJoinToLobbyArgs = {
  data: JoinToLobbyInput;
};


export type MutationUpdateQuestArgs = {
  data: UpdateQuestInput;
};


export type MutationWithdrawGiftsArgs = {
  data: WithdrawGiftInput;
};

export type Participant = {
  __typename?: 'Participant';
  /** Amount */
  amount: Scalars['Float']['output'];
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

export enum Place {
  Fifth = 'Fifth',
  First = 'First',
  Forth = 'Forth',
  Second = 'Second',
  Third = 'Third'
}

export type Query = {
  __typename?: 'Query';
  gift: Gift;
  gifts: Array<Gift>;
  leaderboard: Array<LeaderboardRow>;
  leaderboardInfo: LeaderboardInfo;
  live: Array<User>;
  lobbies: Array<Lobby>;
  lobby: Lobby;
  myScore: LeaderboardRow;
  participant: Participant;
  participants: Array<Participant>;
  profile: User;
  quest: Quest;
  questUser: QuestUser;
  questUsers: Array<QuestUser>;
  quests: Array<Quest>;
  rewards: Array<Gift>;
  transaction: Transaction;
  transactions: Array<Transaction>;
  withdrawRequests: Array<WithdrawRequest>;
  withdrawnGift: WithdrawnGift;
  withdrawnGifts: Array<WithdrawnGift>;
};


export type QueryGiftArgs = {
  id: Scalars['String']['input'];
};


export type QueryGiftsArgs = {
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLeaderboardArgs = {
  end?: Scalars['Int']['input'];
  start: Scalars['Int']['input'];
};


export type QueryLiveArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryLobbiesArgs = {
  skip: Scalars['Int']['input'];
  status?: InputMaybe<Array<LobbyStatus>>;
  take: Scalars['Int']['input'];
};


export type QueryLobbyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryParticipantArgs = {
  id: Scalars['Int']['input'];
};


export type QueryParticipantsArgs = {
  lobbyId?: InputMaybe<Scalars['Int']['input']>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryQuestArgs = {
  id: Scalars['Int']['input'];
};


export type QueryQuestUserArgs = {
  questId: Scalars['Int']['input'];
};


export type QueryQuestUsersArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryQuestsArgs = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryTransactionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTransactionsArgs = {
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryWithdrawRequestsArgs = {
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

export type Quest = {
  __typename?: 'Quest';
  /** Created Date */
  createdAt: Scalars['DateTime']['output'];
  /** Description */
  description: Scalars['String']['output'];
  /** ID */
  id: Scalars['Int']['output'];
  /** Is active */
  isActive: Scalars['Boolean']['output'];
  /** In seconds, if type is renew type custom */
  renewInterval?: Maybe<Scalars['Int']['output']>;
  /** Renew type */
  renewType: RenewType;
  /** Requirements to complete quest */
  requirements: Scalars['JSON']['output'];
  /** Reward */
  reward?: Maybe<QuestUser>;
  /** Reward ID */
  rewardId?: Maybe<Scalars['Int']['output']>;
  /** Title */
  title: Scalars['String']['output'];
  /** Type */
  type: QuestType;
  /** Updated Date */
  updatedAt: Scalars['DateTime']['output'];
};

export enum QuestType {
  Follow = 'Follow'
}

export type QuestUser = {
  __typename?: 'QuestUser';
  completed: Scalars['Boolean']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  lastReset?: Maybe<Scalars['DateTime']['output']>;
  /** Progress of the quest */
  progress: Scalars['JSON']['output'];
  quest: Quest;
  questId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['Int']['output'];
};

export enum RenewType {
  Daily = 'Daily',
  None = 'None',
  Weekly = 'Weekly'
}

export type RequirementsInput = {
  /** Channel ID */
  channelId: Scalars['String']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  /** Amount */
  amount: Scalars['Float']['output'];
  /** Hash of transaction */
  base64Hash?: Maybe<Scalars['String']['output']>;
  /** Created Date */
  createdAt: Scalars['DateTime']['output'];
  /** Source wallet */
  from: Scalars['String']['output'];
  /** Hash of transaction */
  hash: Scalars['String']['output'];
  /** UUID v7 */
  id: Scalars['String']['output'];
  /** Type of transaction */
  status: TransactionStatus;
  /** Destination wallet */
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
  Pending = 'Pending'
}

export enum TransactionType {
  Commission = 'commission',
  WalletTopUp = 'wallet_top_up',
  WalletWithdrawal = 'wallet_withdrawal'
}

export type UpdateQuestInput = {
  /** Description */
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** Is active */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** In seconds, if type is renew type custom */
  renewInterval?: InputMaybe<Scalars['Int']['input']>;
  /** Renew type */
  renewType?: InputMaybe<RenewType>;
  /** Type */
  requirements?: InputMaybe<RequirementsInput>;
  /** Title */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Type */
  type?: InputMaybe<QuestType>;
};

export type User = {
  __typename?: 'User';
  /** Balance */
  balance: Scalars['Float']['output'];
  /** Bonuses */
  bonuses: Scalars['Float']['output'];
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
  /** Avatar */
  image?: Maybe<Scalars['String']['output']>;
  /** Last Name */
  lastName: Scalars['String']['output'];
  /** Last won amount */
  lastWonAmount?: Maybe<Scalars['Float']['output']>;
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

export type WithdrawRequest = {
  __typename?: 'WithdrawRequest';
  /** Amount */
  amount: Scalars['Float']['output'];
  /** Created Date */
  createdAt: Scalars['DateTime']['output'];
  /** UUID v7 */
  id: Scalars['String']['output'];
  /** Updated Date */
  updatedAt: Scalars['DateTime']['output'];
  /** Owner */
  user?: Maybe<User>;
  /** User telegram ID */
  userId?: Maybe<Scalars['String']['output']>;
};

export type WithdrawnGift = {
  __typename?: 'WithdrawnGift';
  /** Gift */
  gift: Gift;
  /** Transaction ID */
  giftId: Scalars['String']['output'];
  /** Status of withdraw */
  status: WithdrawnGiftStatus;
  /** Transaction */
  transaction: Transaction;
  /** Transaction ID */
  transactionId: Scalars['String']['output'];
  /** User */
  user: User;
  /** Transaction ID */
  userId: Scalars['String']['output'];
};

export enum WithdrawnGiftStatus {
  CommissionPaid = 'CommissionPaid',
  Completed = 'Completed',
  Failed = 'Failed',
  Pending = 'Pending',
  RolledBack = 'RolledBack'
}

export type GetGiftsQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  max?: InputMaybe<Scalars['Float']['input']>;
  blocked?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetGiftsQuery = { __typename?: 'Query', gifts: Array<{ __typename?: 'Gift', id: string, slug: string, msgId: string, title: string, model: string, price: number, symbol: string, userId?: string | null, blocked: boolean, externalId: string, symbolPermille: number, rarityPermille: number, backgroundPermille: number, withdrawable: boolean }> };

export type WithdrawnGiftsQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type WithdrawnGiftsQuery = { __typename?: 'Query', withdrawnGifts: Array<{ __typename?: 'WithdrawnGift', status: WithdrawnGiftStatus, transactionId: string, userId: string, giftId: string, gift: { __typename?: 'Gift', id: string, title: string, slug: string, model: string, symbol: string, background: string, blocked: boolean, withdrawn: boolean, withdrawable: boolean, place?: Place | null, isReward: boolean, rewardWasTransferred: boolean, price: number, symbolPermille: number, rarityPermille: number, backgroundPermille: number, msgId: string, externalId: string, userId?: string | null, createdAt: any, updatedAt: any } }> };

export type WithdrawGiftsMutationVariables = Exact<{
  data: WithdrawGiftInput;
}>;


export type WithdrawGiftsMutation = { __typename?: 'Mutation', withdrawGifts: Array<{ __typename?: 'Gift', id: string, title: string, slug: string, price: number }> };

export type LeaderboardInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type LeaderboardInfoQuery = { __typename?: 'Query', leaderboardInfo: { __typename?: 'LeaderboardInfo', id: string, endDate: any, startDate: any, status: LeaderboardStatus, createdAt: any, updatedAt: any } };

export type GetLeaderboardQueryVariables = Exact<{
  start: Scalars['Int']['input'];
  end: Scalars['Int']['input'];
}>;


export type GetLeaderboardQuery = { __typename?: 'Query', leaderboard: Array<{ __typename?: 'LeaderboardRow', userId: number, score?: number | null, rank?: number | null, user: { __typename?: 'User', image?: string | null, username: string } }> };

export type MyScoreQueryVariables = Exact<{ [key: string]: never; }>;


export type MyScoreQuery = { __typename?: 'Query', myScore: { __typename?: 'LeaderboardRow', userId: number, score?: number | null, rank?: number | null, user: { __typename?: 'User', id: number, tgId: string, username: string, lastName: string, firstName: string, tonAddress?: string | null, image?: string | null, referralCode: string, referredBy?: string | null, balance: number, bonuses: number, lastWonAmount?: number | null, displayName: string, wins?: number | null, losses?: number | null, winRate?: number | null, createdAt: any, updatedAt: any } } };

export type GetRewardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRewardsQuery = { __typename?: 'Query', rewards: Array<{ __typename?: 'Gift', id: string, slug: string, place?: Place | null }> };

export type AddGiftsToLobbyMutationVariables = Exact<{
  data: AddGiftsToLobbyInput;
}>;


export type AddGiftsToLobbyMutation = { __typename?: 'Mutation', addGiftsToLobby: { __typename?: 'Participant', id: number, userId: number, amount: number, lobbyId: number, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number, username: string, displayName: string, image?: string | null }, gifts: Array<{ __typename?: 'Gift', id: string, title: string, slug: string, price: number, blocked: boolean }> } };

export type GetLobbiesQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  status?: InputMaybe<Array<LobbyStatus> | LobbyStatus>;
}>;


export type GetLobbiesQuery = { __typename?: 'Query', lobbies: Array<{ __typename?: 'Lobby', id: number, title: string, status: LobbyStatus, minBet?: number | null, maxBet?: number | null, createdAt: any, updatedAt: any, timeToStart: number }> };

export type GetLobbyQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetLobbyQuery = { __typename?: 'Query', lobby: { __typename?: 'Lobby', id: number, title: string, status: LobbyStatus, minBet?: number | null, maxBet?: number | null, timeToStart: number, winnerId?: number | null, createdAt: any, updatedAt: any, countdownExpiresAt?: any | null, participants: Array<{ __typename?: 'Participant', id: number, userId: number, amount: number, user: { __typename?: 'User', image?: string | null, username: string }, gifts: Array<{ __typename?: 'Gift', id: string, slug: string, price: number, blocked: boolean, withdrawable: boolean }> }> } };

export type ParticipantsQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type ParticipantsQuery = { __typename?: 'Query', participants: Array<{ __typename?: 'Participant', id: number, amount: number, userId: number, lobbyId: number, createdAt: any, updatedAt: any, gifts: Array<{ __typename?: 'Gift', id: string, title: string, slug: string, model: string, symbol: string, background: string, blocked: boolean, withdrawn: boolean, withdrawable: boolean, place?: Place | null, isReward: boolean, rewardWasTransferred: boolean, price: number, symbolPermille: number, rarityPermille: number, backgroundPermille: number, msgId: string, externalId: string, userId?: string | null, createdAt: any, updatedAt: any }>, lobby: { __typename?: 'Lobby', id: number, title: string, status: LobbyStatus, minBet?: number | null, maxBet?: number | null, timeToStart: number, winnerId?: number | null, countdownExpiresAt?: any | null, createdAt: any, updatedAt: any, participants: Array<{ __typename?: 'Participant', id: number, amount: number, userId: number, lobbyId: number, createdAt: any, updatedAt: any }> } }> };

export type JoinToLobbyMutationVariables = Exact<{
  data: JoinToLobbyInput;
}>;


export type JoinToLobbyMutation = { __typename?: 'Mutation', joinToLobby: { __typename?: 'Lobby', id: number, title: string, status: LobbyStatus, minBet?: number | null, maxBet?: number | null, timeToStart: number, winnerId?: number | null, createdAt: any, updatedAt: any, participants: Array<{ __typename?: 'Participant', id: number, user: { __typename?: 'User', id: number, username: string } }> } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, tgId: string, image?: string | null, username: string, lastName: string, firstName: string, tonAddress?: string | null, referralCode: string, referredBy?: string | null, bonuses: number, balance: number, displayName: string, winRate?: number | null, wins?: number | null, losses?: number | null, referrals: Array<{ __typename?: 'User', id: number, username: string, image?: string | null }>, withdrawnGifts: Array<{ __typename?: 'WithdrawnGift', status: WithdrawnGiftStatus, transactionId: string, userId: string, giftId: string }>, gifts: Array<{ __typename?: 'Gift', id: string, title: string, slug: string, model: string, symbol: string, background: string, blocked: boolean, withdrawn: boolean, withdrawable: boolean, place?: Place | null, isReward: boolean, rewardWasTransferred: boolean, price: number, symbolPermille: number, rarityPermille: number, backgroundPermille: number, msgId: string, externalId: string, userId?: string | null, createdAt: any, updatedAt: any }> } };

export type ClaimRewardMutationVariables = Exact<{
  questId: Scalars['Int']['input'];
}>;


export type ClaimRewardMutation = { __typename?: 'Mutation', claimReward: { __typename?: 'QuestUser', id: number, progress: any, completed: boolean, completedAt?: any | null, lastReset?: any | null, userId: number, questId: number, createdAt: any, updatedAt: any } };

export type QuestsQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type QuestsQuery = { __typename?: 'Query', quests: Array<{ __typename?: 'Quest', id: number, title: string, description: string, type: QuestType, renewType: RenewType, isActive: boolean, requirements: any, renewInterval?: number | null, rewardId?: number | null, createdAt: any, updatedAt: any }> };

export type QuestUsersQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type QuestUsersQuery = { __typename?: 'Query', questUsers: Array<{ __typename?: 'QuestUser', id: number, progress: any, completed: boolean, completedAt?: any | null, lastReset?: any | null, userId: number, questId: number, createdAt: any, updatedAt: any }> };

export type CreateConfirmTransactionMutationVariables = Exact<{
  data: ConfirmCreationTransactionInput;
}>;


export type CreateConfirmTransactionMutation = { __typename?: 'Mutation', confirmCreationTransaction: { __typename?: 'Transaction', id: string, to: string, hash: string, type: TransactionType, from: string, status: TransactionStatus, amount: number, userId: number, base64Hash?: string | null } };

export type IntegrateTonWalletToUserMutationVariables = Exact<{
  data: IntegrateTonWalletToUserInput;
}>;


export type IntegrateTonWalletToUserMutation = { __typename?: 'Mutation', integrateTonWalletToUser: { __typename?: 'User', id: number, tgId: string, username: string, firstName: string, lastName: string, tonAddress?: string | null, balance: number, createdAt: any, updatedAt: any } };

export type CreateTransactionMutationVariables = Exact<{
  data: CreateTransactionInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction: { __typename?: 'Transaction', id: string, to: string, hash: string, type: TransactionType, from: string, status: TransactionStatus, amount: number, userId: number, base64Hash?: string | null } };

export type CreateWithdrawRequestMutationVariables = Exact<{
  data: CreateWithdrawRequestInput;
}>;


export type CreateWithdrawRequestMutation = { __typename?: 'Mutation', createWithdrawRequest: { __typename?: 'WithdrawRequest', id: string, amount: number, userId?: string | null, user?: { __typename?: 'User', id: number, username: string, displayName: string } | null } };

export type LiveQueryVariables = Exact<{
  take: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type LiveQuery = { __typename?: 'Query', live: Array<{ __typename?: 'User', id: number, tgId: string, username: string, lastName: string, firstName: string, tonAddress?: string | null, image?: string | null, referralCode: string, referredBy?: string | null, balance: number, bonuses: number, lastWonAmount?: number | null, displayName: string, wins?: number | null, losses?: number | null, winRate?: number | null, createdAt: any, updatedAt: any }> };


export const GetGiftsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetGifts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "userId" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "min" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "max" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Float" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "blocked" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "gifts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "take" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "userId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "userId" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "min" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "min" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "max" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "max" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "blocked" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "blocked" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }, { "kind": "Field", "name": { "kind": "Name", "value": "msgId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "model" } }, { "kind": "Field", "name": { "kind": "Name", "value": "price" } }, { "kind": "Field", "name": { "kind": "Name", "value": "symbol" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "blocked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "externalId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "symbolPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "rarityPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "backgroundPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "withdrawable" } }] } }] } }] } as unknown as DocumentNode<GetGiftsQuery, GetGiftsQueryVariables>;
export const WithdrawnGiftsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "WithdrawnGifts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "withdrawnGifts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "take" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "transactionId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "giftId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "gift" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }, { "kind": "Field", "name": { "kind": "Name", "value": "model" } }, { "kind": "Field", "name": { "kind": "Name", "value": "symbol" } }, { "kind": "Field", "name": { "kind": "Name", "value": "background" } }, { "kind": "Field", "name": { "kind": "Name", "value": "blocked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "withdrawn" } }, { "kind": "Field", "name": { "kind": "Name", "value": "withdrawable" } }, { "kind": "Field", "name": { "kind": "Name", "value": "place" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isReward" } }, { "kind": "Field", "name": { "kind": "Name", "value": "rewardWasTransferred" } }, { "kind": "Field", "name": { "kind": "Name", "value": "price" } }, { "kind": "Field", "name": { "kind": "Name", "value": "symbolPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "rarityPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "backgroundPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "msgId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "externalId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }] } }] } }] } }] } as unknown as DocumentNode<WithdrawnGiftsQuery, WithdrawnGiftsQueryVariables>;
export const WithdrawGiftsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "WithdrawGifts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "WithdrawGiftInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "withdrawGifts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }, { "kind": "Field", "name": { "kind": "Name", "value": "price" } }] } }] } }] } as unknown as DocumentNode<WithdrawGiftsMutation, WithdrawGiftsMutationVariables>;
export const LeaderboardInfoDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "LeaderboardInfo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "leaderboardInfo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "endDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startDate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }] } }] } }] } as unknown as DocumentNode<LeaderboardInfoQuery, LeaderboardInfoQueryVariables>;
export const GetLeaderboardDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetLeaderboard" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "start" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "end" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "leaderboard" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "start" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "start" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "end" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "end" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "score" } }, { "kind": "Field", "name": { "kind": "Name", "value": "rank" } }, { "kind": "Field", "name": { "kind": "Name", "value": "user" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "image" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }] } }] } }] } }] } as unknown as DocumentNode<GetLeaderboardQuery, GetLeaderboardQueryVariables>;
export const MyScoreDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "MyScore" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "myScore" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "score" } }, { "kind": "Field", "name": { "kind": "Name", "value": "rank" } }, { "kind": "Field", "name": { "kind": "Name", "value": "user" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tgId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "firstName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tonAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }, { "kind": "Field", "name": { "kind": "Name", "value": "referralCode" } }, { "kind": "Field", "name": { "kind": "Name", "value": "referredBy" } }, { "kind": "Field", "name": { "kind": "Name", "value": "balance" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bonuses" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastWonAmount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "displayName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "wins" } }, { "kind": "Field", "name": { "kind": "Name", "value": "losses" } }, { "kind": "Field", "name": { "kind": "Name", "value": "winRate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }] } }] } }] } }] } as unknown as DocumentNode<MyScoreQuery, MyScoreQueryVariables>;
export const GetRewardsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetRewards" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "rewards" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }, { "kind": "Field", "name": { "kind": "Name", "value": "place" } }] } }] } }] } as unknown as DocumentNode<GetRewardsQuery, GetRewardsQueryVariables>;
export const AddGiftsToLobbyDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AddGiftsToLobby" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "AddGiftsToLobbyInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "addGiftsToLobby" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lobbyId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "user" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "displayName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "gifts" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }, { "kind": "Field", "name": { "kind": "Name", "value": "price" } }, { "kind": "Field", "name": { "kind": "Name", "value": "blocked" } }] } }] } }] } }] } as unknown as DocumentNode<AddGiftsToLobbyMutation, AddGiftsToLobbyMutationVariables>;
export const GetLobbiesDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetLobbies" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "status" } }, "type": { "kind": "ListType", "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "LobbyStatus" } } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "lobbies" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "take" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "status" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "status" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "minBet" } }, { "kind": "Field", "name": { "kind": "Name", "value": "maxBet" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timeToStart" } }] } }] } }] } as unknown as DocumentNode<GetLobbiesQuery, GetLobbiesQueryVariables>;
export const GetLobbyDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetLobby" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "lobby" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "minBet" } }, { "kind": "Field", "name": { "kind": "Name", "value": "maxBet" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timeToStart" } }, { "kind": "Field", "name": { "kind": "Name", "value": "winnerId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "countdownExpiresAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "participants" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "user" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "image" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "gifts" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }, { "kind": "Field", "name": { "kind": "Name", "value": "price" } }, { "kind": "Field", "name": { "kind": "Name", "value": "blocked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "withdrawable" } }] } }] } }] } }] } }] } as unknown as DocumentNode<GetLobbyQuery, GetLobbyQueryVariables>;
export const ParticipantsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Participants" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "participants" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "take" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lobbyId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "gifts" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }, { "kind": "Field", "name": { "kind": "Name", "value": "model" } }, { "kind": "Field", "name": { "kind": "Name", "value": "symbol" } }, { "kind": "Field", "name": { "kind": "Name", "value": "background" } }, { "kind": "Field", "name": { "kind": "Name", "value": "blocked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "withdrawn" } }, { "kind": "Field", "name": { "kind": "Name", "value": "withdrawable" } }, { "kind": "Field", "name": { "kind": "Name", "value": "place" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isReward" } }, { "kind": "Field", "name": { "kind": "Name", "value": "rewardWasTransferred" } }, { "kind": "Field", "name": { "kind": "Name", "value": "price" } }, { "kind": "Field", "name": { "kind": "Name", "value": "symbolPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "rarityPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "backgroundPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "msgId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "externalId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "lobby" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "minBet" } }, { "kind": "Field", "name": { "kind": "Name", "value": "maxBet" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timeToStart" } }, { "kind": "Field", "name": { "kind": "Name", "value": "winnerId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "countdownExpiresAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "participants" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lobbyId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }] } }] } }] } }] } }] } as unknown as DocumentNode<ParticipantsQuery, ParticipantsQueryVariables>;
export const JoinToLobbyDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "JoinToLobby" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "JoinToLobbyInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "joinToLobby" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "minBet" } }, { "kind": "Field", "name": { "kind": "Name", "value": "maxBet" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timeToStart" } }, { "kind": "Field", "name": { "kind": "Name", "value": "winnerId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "participants" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "user" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }] } }] } }] } }] } }] } as unknown as DocumentNode<JoinToLobbyMutation, JoinToLobbyMutationVariables>;
export const ProfileDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Profile" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "profile" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tgId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "firstName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tonAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "referralCode" } }, { "kind": "Field", "name": { "kind": "Name", "value": "referredBy" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bonuses" } }, { "kind": "Field", "name": { "kind": "Name", "value": "balance" } }, { "kind": "Field", "name": { "kind": "Name", "value": "displayName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "winRate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "wins" } }, { "kind": "Field", "name": { "kind": "Name", "value": "losses" } }, { "kind": "Field", "name": { "kind": "Name", "value": "referrals" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "withdrawnGifts" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "transactionId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "giftId" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "gifts" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "slug" } }, { "kind": "Field", "name": { "kind": "Name", "value": "model" } }, { "kind": "Field", "name": { "kind": "Name", "value": "symbol" } }, { "kind": "Field", "name": { "kind": "Name", "value": "background" } }, { "kind": "Field", "name": { "kind": "Name", "value": "blocked" } }, { "kind": "Field", "name": { "kind": "Name", "value": "withdrawn" } }, { "kind": "Field", "name": { "kind": "Name", "value": "withdrawable" } }, { "kind": "Field", "name": { "kind": "Name", "value": "place" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isReward" } }, { "kind": "Field", "name": { "kind": "Name", "value": "rewardWasTransferred" } }, { "kind": "Field", "name": { "kind": "Name", "value": "price" } }, { "kind": "Field", "name": { "kind": "Name", "value": "symbolPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "rarityPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "backgroundPermille" } }, { "kind": "Field", "name": { "kind": "Name", "value": "msgId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "externalId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }] } }] } }] } }] } as unknown as DocumentNode<ProfileQuery, ProfileQueryVariables>;
export const ClaimRewardDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "ClaimReward" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "questId" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "claimReward" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "questId" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "questId" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "progress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "completed" } }, { "kind": "Field", "name": { "kind": "Name", "value": "completedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastReset" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "questId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }] } }] } }] } as unknown as DocumentNode<ClaimRewardMutation, ClaimRewardMutationVariables>;
export const QuestsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Quests" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "quests" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "take" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "renewType" } }, { "kind": "Field", "name": { "kind": "Name", "value": "isActive" } }, { "kind": "Field", "name": { "kind": "Name", "value": "requirements" } }, { "kind": "Field", "name": { "kind": "Name", "value": "renewInterval" } }, { "kind": "Field", "name": { "kind": "Name", "value": "rewardId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }] } }] } }] } as unknown as DocumentNode<QuestsQuery, QuestsQueryVariables>;
export const QuestUsersDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "QuestUsers" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "questUsers" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "take" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "progress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "completed" } }, { "kind": "Field", "name": { "kind": "Name", "value": "completedAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastReset" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "questId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }] } }] } }] } as unknown as DocumentNode<QuestUsersQuery, QuestUsersQueryVariables>;
export const CreateConfirmTransactionDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateConfirmTransaction" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ConfirmCreationTransactionInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "confirmCreationTransaction" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "to" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "from" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "base64Hash" } }] } }] } }] } as unknown as DocumentNode<CreateConfirmTransactionMutation, CreateConfirmTransactionMutationVariables>;
export const IntegrateTonWalletToUserDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "IntegrateTonWalletToUser" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "IntegrateTonWalletToUserInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "integrateTonWalletToUser" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tgId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "firstName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tonAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "balance" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }] } }] } }] } as unknown as DocumentNode<IntegrateTonWalletToUserMutation, IntegrateTonWalletToUserMutationVariables>;
export const CreateTransactionDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateTransaction" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateTransactionInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createTransaction" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "to" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hash" } }, { "kind": "Field", "name": { "kind": "Name", "value": "type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "from" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "base64Hash" } }] } }] } }] } as unknown as DocumentNode<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const CreateWithdrawRequestDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateWithdrawRequest" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateWithdrawRequestInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createWithdrawRequest" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "data" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "data" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "amount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "userId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "user" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "displayName" } }] } }] } }] } }] } as unknown as DocumentNode<CreateWithdrawRequestMutation, CreateWithdrawRequestMutationVariables>;
export const LiveDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Live" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "live" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "take" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "take" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "skip" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "skip" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tgId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "username" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "firstName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tonAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "image" } }, { "kind": "Field", "name": { "kind": "Name", "value": "referralCode" } }, { "kind": "Field", "name": { "kind": "Name", "value": "referredBy" } }, { "kind": "Field", "name": { "kind": "Name", "value": "balance" } }, { "kind": "Field", "name": { "kind": "Name", "value": "bonuses" } }, { "kind": "Field", "name": { "kind": "Name", "value": "lastWonAmount" } }, { "kind": "Field", "name": { "kind": "Name", "value": "displayName" } }, { "kind": "Field", "name": { "kind": "Name", "value": "wins" } }, { "kind": "Field", "name": { "kind": "Name", "value": "losses" } }, { "kind": "Field", "name": { "kind": "Name", "value": "winRate" } }, { "kind": "Field", "name": { "kind": "Name", "value": "createdAt" } }, { "kind": "Field", "name": { "kind": "Name", "value": "updatedAt" } }] } }] } }] } as unknown as DocumentNode<LiveQuery, LiveQueryVariables>;