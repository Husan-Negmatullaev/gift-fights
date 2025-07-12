import { DEV_TELEGRAM_AUTH } from "@/shared/constants/auth-token-constants";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const GRAPHQL_URL = `${import.meta.env.VITE_DOMAIN}/graphql`;

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const initData = DEV_TELEGRAM_AUTH;

  return {
    headers: {
      ...headers,
      Authorization: initData,
    },
  };
});

export const APOLLO_CLIENT_CONFIG = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
