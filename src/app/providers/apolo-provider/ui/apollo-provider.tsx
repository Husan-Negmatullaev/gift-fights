import { APOLLO_CLIENT_CONFIG } from "@/shared/api/graphql/config-apolo";
import { ApolloProvider as AppApolloProvider } from "@apollo/client";

import type { ReactNode } from "react";

type ApolloProviderProps = {
  children: ReactNode;
};

export const ApolloProvider = (props: ApolloProviderProps) => {
  const { children } = props;

  return (
    <AppApolloProvider client={APOLLO_CLIENT_CONFIG}>
      {children}
    </AppApolloProvider>
  );
};
