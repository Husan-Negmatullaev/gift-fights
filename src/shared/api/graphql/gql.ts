/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "\n  query GetGifts(\n    $take: Int!\n    $skip: Int!\n    $userId: String\n    $min: Float\n    $max: Float\n    $blocked: Boolean\n  ) {\n    gifts(\n      take: $take\n      skip: $skip\n      userId: $userId\n      min: $min\n      max: $max\n      blocked: $blocked\n    ) {\n      id\n      slug\n      msgId\n      title\n      model\n      price\n      symbol\n      userId\n      blocked\n      externalId\n      symbolPermille\n      rarityPermille\n      backgroundPermille\n    }\n  }\n": typeof types.GetGiftsDocument,
  "\n  query WithdrawnGifts($take: Int!, $skip: Int!) {\n    withdrawnGifts(take: $take, skip: $skip) {\n      id\n      slug\n      title\n      price\n      status\n    }\n  }\n": typeof types.WithdrawnGiftsDocument,
  "\n  mutation WithdrawGifts($data: WithdrawGiftInput!) {\n    withdrawGifts(data: $data) {\n      id\n      title\n      slug\n      price\n    }\n  }\n": typeof types.WithdrawGiftsDocument,
  "\n  query LeaderboardInfo {\n    leaderboardInfo {\n      id\n      endDate\n      startDate\n      status\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.LeaderboardInfoDocument,
  "\n  query GetLeaderboard($start: Int!, $end: Int!) {\n    leaderboard(start: $start, end: $end) {\n      userId\n      score\n      rank\n      user {\n        image\n        username\n      }\n    }\n  }\n": typeof types.GetLeaderboardDocument,
  "\n  query MyScore {\n    myScore {\n      userId\n      score\n      rank\n      user {\n        username\n      }\n    }\n  }\n": typeof types.MyScoreDocument,
  "\n  query GetRewards {\n    rewards {\n      id\n      slug\n      place\n    }\n  }\n": typeof types.GetRewardsDocument,
  "\n  query GetLobbies($take: Int!, $skip: Int!, $status: [LobbyStatus!]) {\n    lobbies(take: $take, skip: $skip, status: $status) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      createdAt\n      updatedAt\n      timeToStart\n    }\n  }\n": typeof types.GetLobbiesDocument,
  "\n  query GetLobby($id: Int!) {\n    lobby(id: $id) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      countdownExpiresAt\n      participants {\n        id\n        userId\n        amount\n        user {\n          image\n          username\n        }\n        gifts {\n          id\n          slug\n          price\n          blocked\n        }\n      }\n    }\n  }\n": typeof types.GetLobbyDocument,
  "\n  mutation JoinToLobby($data: JoinToLobbyInput!) {\n    joinToLobby(data: $data) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": typeof types.JoinToLobbyDocument,
  "\n  query Profile {\n    profile {\n      id\n      tgId\n      image\n      username\n      lastName\n      firstName\n      tonAddress\n      referralCode\n      referredBy\n      bonuses\n      balance\n      displayName\n      winRate\n      wins\n      losses\n      withdrawnGifts {\n        id\n        slug\n        price\n        title\n      }\n    }\n  }\n": typeof types.ProfileDocument,
  "\n  mutation CreateConfirmTransaction($data: ConfirmCreationTransactionInput!) {\n    confirmCreationTransaction(data: $data) {\n      id\n      to\n      hash\n      type\n      from\n      status\n      amount\n      userId\n      base64Hash\n    }\n  }\n": typeof types.CreateConfirmTransactionDocument,
  "\n  mutation IntegrateTonWalletToUser($data: IntegrateTonWalletToUserInput!) {\n    integrateTonWalletToUser(data: $data) {\n      id\n      tgId\n      username\n      firstName\n      lastName\n      tonAddress\n      balance\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.IntegrateTonWalletToUserDocument,
  "\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n      to\n      hash\n      type\n      from\n      status\n      amount\n      userId\n      base64Hash\n    }\n  }\n": typeof types.CreateTransactionDocument,
  "\n  mutation CreateWithdrawRequest($data: CreateWithdrawRequestInput!) {\n    createWithdrawRequest(data: $data) {\n      id\n      amount\n      userId\n      user {\n        id\n        username\n        displayName\n      }\n    }\n  }\n": typeof types.CreateWithdrawRequestDocument,
};
const documents: Documents = {
  "\n  query GetGifts(\n    $take: Int!\n    $skip: Int!\n    $userId: String\n    $min: Float\n    $max: Float\n    $blocked: Boolean\n  ) {\n    gifts(\n      take: $take\n      skip: $skip\n      userId: $userId\n      min: $min\n      max: $max\n      blocked: $blocked\n    ) {\n      id\n      slug\n      msgId\n      title\n      model\n      price\n      symbol\n      userId\n      blocked\n      externalId\n      symbolPermille\n      rarityPermille\n      backgroundPermille\n    }\n  }\n": types.GetGiftsDocument,
  "\n  query WithdrawnGifts($take: Int!, $skip: Int!) {\n    withdrawnGifts(take: $take, skip: $skip) {\n      id\n      slug\n      title\n      price\n      status\n    }\n  }\n": types.WithdrawnGiftsDocument,
  "\n  mutation WithdrawGifts($data: WithdrawGiftInput!) {\n    withdrawGifts(data: $data) {\n      id\n      title\n      slug\n      price\n    }\n  }\n": types.WithdrawGiftsDocument,
  "\n  query LeaderboardInfo {\n    leaderboardInfo {\n      id\n      endDate\n      startDate\n      status\n      createdAt\n      updatedAt\n    }\n  }\n": types.LeaderboardInfoDocument,
  "\n  query GetLeaderboard($start: Int!, $end: Int!) {\n    leaderboard(start: $start, end: $end) {\n      userId\n      score\n      rank\n      user {\n        image\n        username\n      }\n    }\n  }\n": types.GetLeaderboardDocument,
  "\n  query MyScore {\n    myScore {\n      userId\n      score\n      rank\n      user {\n        username\n      }\n    }\n  }\n": types.MyScoreDocument,
  "\n  query GetRewards {\n    rewards {\n      id\n      slug\n      place\n    }\n  }\n": types.GetRewardsDocument,
  "\n  query GetLobbies($take: Int!, $skip: Int!, $status: [LobbyStatus!]) {\n    lobbies(take: $take, skip: $skip, status: $status) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      createdAt\n      updatedAt\n      timeToStart\n    }\n  }\n": types.GetLobbiesDocument,
  "\n  query GetLobby($id: Int!) {\n    lobby(id: $id) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      countdownExpiresAt\n      participants {\n        id\n        userId\n        amount\n        user {\n          image\n          username\n        }\n        gifts {\n          id\n          slug\n          price\n          blocked\n        }\n      }\n    }\n  }\n": types.GetLobbyDocument,
  "\n  mutation JoinToLobby($data: JoinToLobbyInput!) {\n    joinToLobby(data: $data) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n": types.JoinToLobbyDocument,
  "\n  query Profile {\n    profile {\n      id\n      tgId\n      image\n      username\n      lastName\n      firstName\n      tonAddress\n      referralCode\n      referredBy\n      bonuses\n      balance\n      displayName\n      winRate\n      wins\n      losses\n      withdrawnGifts {\n        id\n        slug\n        price\n        title\n      }\n    }\n  }\n": types.ProfileDocument,
  "\n  mutation CreateConfirmTransaction($data: ConfirmCreationTransactionInput!) {\n    confirmCreationTransaction(data: $data) {\n      id\n      to\n      hash\n      type\n      from\n      status\n      amount\n      userId\n      base64Hash\n    }\n  }\n": types.CreateConfirmTransactionDocument,
  "\n  mutation IntegrateTonWalletToUser($data: IntegrateTonWalletToUserInput!) {\n    integrateTonWalletToUser(data: $data) {\n      id\n      tgId\n      username\n      firstName\n      lastName\n      tonAddress\n      balance\n      createdAt\n      updatedAt\n    }\n  }\n": types.IntegrateTonWalletToUserDocument,
  "\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n      to\n      hash\n      type\n      from\n      status\n      amount\n      userId\n      base64Hash\n    }\n  }\n": types.CreateTransactionDocument,
  "\n  mutation CreateWithdrawRequest($data: CreateWithdrawRequestInput!) {\n    createWithdrawRequest(data: $data) {\n      id\n      amount\n      userId\n      user {\n        id\n        username\n        displayName\n      }\n    }\n  }\n": types.CreateWithdrawRequestDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGifts(\n    $take: Int!\n    $skip: Int!\n    $userId: String\n    $min: Float\n    $max: Float\n    $blocked: Boolean\n  ) {\n    gifts(\n      take: $take\n      skip: $skip\n      userId: $userId\n      min: $min\n      max: $max\n      blocked: $blocked\n    ) {\n      id\n      slug\n      msgId\n      title\n      model\n      price\n      symbol\n      userId\n      blocked\n      externalId\n      symbolPermille\n      rarityPermille\n      backgroundPermille\n    }\n  }\n"): (typeof documents)["\n  query GetGifts(\n    $take: Int!\n    $skip: Int!\n    $userId: String\n    $min: Float\n    $max: Float\n    $blocked: Boolean\n  ) {\n    gifts(\n      take: $take\n      skip: $skip\n      userId: $userId\n      min: $min\n      max: $max\n      blocked: $blocked\n    ) {\n      id\n      slug\n      msgId\n      title\n      model\n      price\n      symbol\n      userId\n      blocked\n      externalId\n      symbolPermille\n      rarityPermille\n      backgroundPermille\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WithdrawnGifts($take: Int!, $skip: Int!) {\n    withdrawnGifts(take: $take, skip: $skip) {\n      id\n      slug\n      title\n      price\n      status\n    }\n  }\n"): (typeof documents)["\n  query WithdrawnGifts($take: Int!, $skip: Int!) {\n    withdrawnGifts(take: $take, skip: $skip) {\n      id\n      slug\n      title\n      price\n      status\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation WithdrawGifts($data: WithdrawGiftInput!) {\n    withdrawGifts(data: $data) {\n      id\n      title\n      slug\n      price\n    }\n  }\n"): (typeof documents)["\n  mutation WithdrawGifts($data: WithdrawGiftInput!) {\n    withdrawGifts(data: $data) {\n      id\n      title\n      slug\n      price\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query LeaderboardInfo {\n    leaderboardInfo {\n      id\n      endDate\n      startDate\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query LeaderboardInfo {\n    leaderboardInfo {\n      id\n      endDate\n      startDate\n      status\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLeaderboard($start: Int!, $end: Int!) {\n    leaderboard(start: $start, end: $end) {\n      userId\n      score\n      rank\n      user {\n        image\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLeaderboard($start: Int!, $end: Int!) {\n    leaderboard(start: $start, end: $end) {\n      userId\n      score\n      rank\n      user {\n        image\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyScore {\n    myScore {\n      userId\n      score\n      rank\n      user {\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyScore {\n    myScore {\n      userId\n      score\n      rank\n      user {\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetRewards {\n    rewards {\n      id\n      slug\n      place\n    }\n  }\n"): (typeof documents)["\n  query GetRewards {\n    rewards {\n      id\n      slug\n      place\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLobbies($take: Int!, $skip: Int!, $status: [LobbyStatus!]) {\n    lobbies(take: $take, skip: $skip, status: $status) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      createdAt\n      updatedAt\n      timeToStart\n    }\n  }\n"): (typeof documents)["\n  query GetLobbies($take: Int!, $skip: Int!, $status: [LobbyStatus!]) {\n    lobbies(take: $take, skip: $skip, status: $status) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      createdAt\n      updatedAt\n      timeToStart\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetLobby($id: Int!) {\n    lobby(id: $id) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      countdownExpiresAt\n      participants {\n        id\n        userId\n        amount\n        user {\n          image\n          username\n        }\n        gifts {\n          id\n          slug\n          price\n          blocked\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetLobby($id: Int!) {\n    lobby(id: $id) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      countdownExpiresAt\n      participants {\n        id\n        userId\n        amount\n        user {\n          image\n          username\n        }\n        gifts {\n          id\n          slug\n          price\n          blocked\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation JoinToLobby($data: JoinToLobbyInput!) {\n    joinToLobby(data: $data) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation JoinToLobby($data: JoinToLobbyInput!) {\n    joinToLobby(data: $data) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Profile {\n    profile {\n      id\n      tgId\n      image\n      username\n      lastName\n      firstName\n      tonAddress\n      referralCode\n      referredBy\n      bonuses\n      balance\n      displayName\n      winRate\n      wins\n      losses\n      withdrawnGifts {\n        id\n        slug\n        price\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query Profile {\n    profile {\n      id\n      tgId\n      image\n      username\n      lastName\n      firstName\n      tonAddress\n      referralCode\n      referredBy\n      bonuses\n      balance\n      displayName\n      winRate\n      wins\n      losses\n      withdrawnGifts {\n        id\n        slug\n        price\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateConfirmTransaction($data: ConfirmCreationTransactionInput!) {\n    confirmCreationTransaction(data: $data) {\n      id\n      to\n      hash\n      type\n      from\n      status\n      amount\n      userId\n      base64Hash\n    }\n  }\n"): (typeof documents)["\n  mutation CreateConfirmTransaction($data: ConfirmCreationTransactionInput!) {\n    confirmCreationTransaction(data: $data) {\n      id\n      to\n      hash\n      type\n      from\n      status\n      amount\n      userId\n      base64Hash\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation IntegrateTonWalletToUser($data: IntegrateTonWalletToUserInput!) {\n    integrateTonWalletToUser(data: $data) {\n      id\n      tgId\n      username\n      firstName\n      lastName\n      tonAddress\n      balance\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation IntegrateTonWalletToUser($data: IntegrateTonWalletToUserInput!) {\n    integrateTonWalletToUser(data: $data) {\n      id\n      tgId\n      username\n      firstName\n      lastName\n      tonAddress\n      balance\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n      to\n      hash\n      type\n      from\n      status\n      amount\n      userId\n      base64Hash\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n      to\n      hash\n      type\n      from\n      status\n      amount\n      userId\n      base64Hash\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateWithdrawRequest($data: CreateWithdrawRequestInput!) {\n    createWithdrawRequest(data: $data) {\n      id\n      amount\n      userId\n      user {\n        id\n        username\n        displayName\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateWithdrawRequest($data: CreateWithdrawRequestInput!) {\n    createWithdrawRequest(data: $data) {\n      id\n      amount\n      userId\n      user {\n        id\n        username\n        displayName\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;