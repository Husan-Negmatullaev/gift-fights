import { ApolloProvider as AppApolloProvider } from '@apollo/client';
import { client } from '../config/config-apolo';
import type { ReactNode } from 'react';

type ApoloProviderProps = {
  children: ReactNode;
};

export const ApoloProvider = (props: ApoloProviderProps) => {
  const { children } = props;

  return <AppApolloProvider client={client}>{children}</AppApolloProvider>;
};
