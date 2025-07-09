import { useMutation } from "@apollo/client";
import {
  type CreateTransactionInput,
  type CreateTransactionMutation,
  type CreateTransactionMutationVariables,
} from "@/shared/api/graphql/graphql";
import { graphql } from "@/shared/api/graphql";

// GraphQL-мутция
const CREATE_TRANSACTION = graphql(`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      to
      hash
      type
      from
      status
      amount
      userId
      base64Hash
    }
  }
`);

export const useCreateTransaction = () => {
  const [mutate, { data, loading, error }] = useMutation<
    CreateTransactionMutation,
    CreateTransactionMutationVariables
  >(CREATE_TRANSACTION);

  // Вызов: makeTransaction({ type: 'wallet_top_up', amount: 1 })
  const makeTransaction = (input: CreateTransactionInput) => {
    return mutate({ variables: { data: input } });
  };

  return {
    data,
    error,
    loading,
    makeTransaction,
  };
};
