/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
  '\n  query GetGifts($take: Int!, $skip: Int!, $userId: String, $blocked: Boolean) {\n    gifts(take: $take, skip: $skip, userId: $userId, blocked: $blocked) {\n      id\n      slug\n      msgId\n      title\n      model\n      price\n      symbol\n      userId\n      blocked\n      externalId\n      symbolPermille\n      rarityPermille\n      backgroundPermille\n    }\n  }\n': typeof types.GetGiftsDocument;
  '\n  query GetLobbies($take: Int!, $skip: Int!, $status: LobbyStatus) {\n    lobbies(take: $take, skip: $skip, status: $status) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      createdAt\n      updatedAt\n      timeToStart\n    }\n  }\n': typeof types.GetLobbiesDocument;
  '\n  query GetLobby($id: Int!) {\n    lobby(id: $id) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        userId\n        amount\n        user {\n          username\n        }\n        gifts {\n          id\n          price\n          slug\n        }\n      }\n    }\n  }\n': typeof types.GetLobbyDocument;
  '\n  mutation JoinToLobby($data: JoinToLobbyInput!) {\n    joinToLobby(data: $data) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n': typeof types.JoinToLobbyDocument;
  '\n  mutation IntegrateTonWalletToUser($data: IntegrateTonWalletToUserInput!) {\n    integrateTonWalletToUser(data: $data) {\n      id\n      tgId\n      username\n      firstName\n      lastName\n      tonAddress\n      balance\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.IntegrateTonWalletToUserDocument;
  '\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n      to\n      from\n      hash\n      type\n      status\n      amount\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.CreateTransactionDocument;
  '\n  query GetUser($id: Int!) {\n    user(id: $id) {\n      id\n      username\n      displayName\n      lastName\n      tonAddress\n      gifts {\n        id\n        title\n        slug\n        price\n      }\n      withdrawnGifts {\n        id\n        slug\n        title\n        price\n      }\n    }\n  }\n': typeof types.GetUserDocument;
  '\n  query Profile {\n    profile {\n      id\n      tgId\n      username\n      lastName\n      firstName\n      tonAddress\n      referralCode\n      referredBy\n      balance\n      displayName\n      # gifts\n      # referrer\n      # referrals\n      # transactions\n      # participation\n      wonGames {\n        id\n      }\n      withdrawnGifts {\n        id\n      }\n      createdAt\n      updatedAt\n    }\n  }\n': typeof types.ProfileDocument;
};
const documents: Documents = {
  '\n  query GetGifts($take: Int!, $skip: Int!, $userId: String, $blocked: Boolean) {\n    gifts(take: $take, skip: $skip, userId: $userId, blocked: $blocked) {\n      id\n      slug\n      msgId\n      title\n      model\n      price\n      symbol\n      userId\n      blocked\n      externalId\n      symbolPermille\n      rarityPermille\n      backgroundPermille\n    }\n  }\n':
    types.GetGiftsDocument,
  '\n  query GetLobbies($take: Int!, $skip: Int!, $status: LobbyStatus) {\n    lobbies(take: $take, skip: $skip, status: $status) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      createdAt\n      updatedAt\n      timeToStart\n    }\n  }\n':
    types.GetLobbiesDocument,
  '\n  query GetLobby($id: Int!) {\n    lobby(id: $id) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        userId\n        amount\n        user {\n          username\n        }\n        gifts {\n          id\n          price\n          slug\n        }\n      }\n    }\n  }\n':
    types.GetLobbyDocument,
  '\n  mutation JoinToLobby($data: JoinToLobbyInput!) {\n    joinToLobby(data: $data) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n':
    types.JoinToLobbyDocument,
  '\n  mutation IntegrateTonWalletToUser($data: IntegrateTonWalletToUserInput!) {\n    integrateTonWalletToUser(data: $data) {\n      id\n      tgId\n      username\n      firstName\n      lastName\n      tonAddress\n      balance\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.IntegrateTonWalletToUserDocument,
  '\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n      to\n      from\n      hash\n      type\n      status\n      amount\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.CreateTransactionDocument,
  '\n  query GetUser($id: Int!) {\n    user(id: $id) {\n      id\n      username\n      displayName\n      lastName\n      tonAddress\n      gifts {\n        id\n        title\n        slug\n        price\n      }\n      withdrawnGifts {\n        id\n        slug\n        title\n        price\n      }\n    }\n  }\n':
    types.GetUserDocument,
  '\n  query Profile {\n    profile {\n      id\n      tgId\n      username\n      lastName\n      firstName\n      tonAddress\n      referralCode\n      referredBy\n      balance\n      displayName\n      # gifts\n      # referrer\n      # referrals\n      # transactions\n      # participation\n      wonGames {\n        id\n      }\n      withdrawnGifts {\n        id\n      }\n      createdAt\n      updatedAt\n    }\n  }\n':
    types.ProfileDocument,
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
export function graphql(
  source: '\n  query GetGifts($take: Int!, $skip: Int!, $userId: String, $blocked: Boolean) {\n    gifts(take: $take, skip: $skip, userId: $userId, blocked: $blocked) {\n      id\n      slug\n      msgId\n      title\n      model\n      price\n      symbol\n      userId\n      blocked\n      externalId\n      symbolPermille\n      rarityPermille\n      backgroundPermille\n    }\n  }\n',
): (typeof documents)['\n  query GetGifts($take: Int!, $skip: Int!, $userId: String, $blocked: Boolean) {\n    gifts(take: $take, skip: $skip, userId: $userId, blocked: $blocked) {\n      id\n      slug\n      msgId\n      title\n      model\n      price\n      symbol\n      userId\n      blocked\n      externalId\n      symbolPermille\n      rarityPermille\n      backgroundPermille\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetLobbies($take: Int!, $skip: Int!, $status: LobbyStatus) {\n    lobbies(take: $take, skip: $skip, status: $status) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      createdAt\n      updatedAt\n      timeToStart\n    }\n  }\n',
): (typeof documents)['\n  query GetLobbies($take: Int!, $skip: Int!, $status: LobbyStatus) {\n    lobbies(take: $take, skip: $skip, status: $status) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      createdAt\n      updatedAt\n      timeToStart\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetLobby($id: Int!) {\n    lobby(id: $id) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        userId\n        amount\n        user {\n          username\n        }\n        gifts {\n          id\n          price\n          slug\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetLobby($id: Int!) {\n    lobby(id: $id) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        userId\n        amount\n        user {\n          username\n        }\n        gifts {\n          id\n          price\n          slug\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation JoinToLobby($data: JoinToLobbyInput!) {\n    joinToLobby(data: $data) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n',
): (typeof documents)['\n  mutation JoinToLobby($data: JoinToLobbyInput!) {\n    joinToLobby(data: $data) {\n      id\n      title\n      status\n      minBet\n      maxBet\n      timeToStart\n      winnerId\n      createdAt\n      updatedAt\n      participants {\n        id\n        user {\n          id\n          username\n        }\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation IntegrateTonWalletToUser($data: IntegrateTonWalletToUserInput!) {\n    integrateTonWalletToUser(data: $data) {\n      id\n      tgId\n      username\n      firstName\n      lastName\n      tonAddress\n      balance\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation IntegrateTonWalletToUser($data: IntegrateTonWalletToUserInput!) {\n    integrateTonWalletToUser(data: $data) {\n      id\n      tgId\n      username\n      firstName\n      lastName\n      tonAddress\n      balance\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n      to\n      from\n      hash\n      type\n      status\n      amount\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  mutation CreateTransaction($data: CreateTransactionInput!) {\n    createTransaction(data: $data) {\n      id\n      to\n      from\n      hash\n      type\n      status\n      amount\n      userId\n      createdAt\n      updatedAt\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetUser($id: Int!) {\n    user(id: $id) {\n      id\n      username\n      displayName\n      lastName\n      tonAddress\n      gifts {\n        id\n        title\n        slug\n        price\n      }\n      withdrawnGifts {\n        id\n        slug\n        title\n        price\n      }\n    }\n  }\n',
): (typeof documents)['\n  query GetUser($id: Int!) {\n    user(id: $id) {\n      id\n      username\n      displayName\n      lastName\n      tonAddress\n      gifts {\n        id\n        title\n        slug\n        price\n      }\n      withdrawnGifts {\n        id\n        slug\n        title\n        price\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Profile {\n    profile {\n      id\n      tgId\n      username\n      lastName\n      firstName\n      tonAddress\n      referralCode\n      referredBy\n      balance\n      displayName\n      # gifts\n      # referrer\n      # referrals\n      # transactions\n      # participation\n      wonGames {\n        id\n      }\n      withdrawnGifts {\n        id\n      }\n      createdAt\n      updatedAt\n    }\n  }\n',
): (typeof documents)['\n  query Profile {\n    profile {\n      id\n      tgId\n      username\n      lastName\n      firstName\n      tonAddress\n      referralCode\n      referredBy\n      balance\n      displayName\n      # gifts\n      # referrer\n      # referrals\n      # transactions\n      # participation\n      wonGames {\n        id\n      }\n      withdrawnGifts {\n        id\n      }\n      createdAt\n      updatedAt\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
