import { useMutation } from "@apollo/client";
import {
  type ConfirmCreationTransactionInput,
  type CreateConfirmTransactionMutation,
  type CreateConfirmTransactionMutationVariables,
} from "@/shared/api/graphql/graphql";
import { graphql } from "@/shared/api/graphql";

// GraphQL-мутция
const CREATE_CONFIRM_TRANSACTION = graphql(`
  mutation CreateConfirmTransaction($data: ConfirmCreationTransactionInput!) {
    confirmCreationTransaction(data: $data) {
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

export const useConfirmTransaction = () => {
  const [mutate, { data, loading, error }] = useMutation<
    CreateConfirmTransactionMutation,
    CreateConfirmTransactionMutationVariables
  >(CREATE_CONFIRM_TRANSACTION);

  // Вызов: makeTransaction({ type: 'wallet_top_up', amount: 1 })
  const confirmTransaction = (input: ConfirmCreationTransactionInput) => {
    return mutate({ variables: { data: input } });
  };

  return {
    data,
    error,
    loading,
    confirmTransaction,
  };
};
