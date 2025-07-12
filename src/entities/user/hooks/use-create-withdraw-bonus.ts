import { useMutation } from '@apollo/client';
import { graphql } from '@/shared/api/graphql';

// Типы для мутации
import type {
  CreateWithdrawRequestInput,
  CreateWithdrawRequestMutation,
  CreateWithdrawRequestMutationVariables,
} from '@/shared/api/graphql/graphql';

const CREATE_WITHDRAW_REQUEST = graphql(`
  mutation CreateWithdrawRequest($data: CreateWithdrawRequestInput!) {
    createWithdrawRequest(data: $data) {
      id
      amount
      userId
      user {
        id
        username
        displayName
      }
    }
  }
`);

export const useCreateWithdrawBonus = () => {
  const [mutate, { data, loading, error }] = useMutation<
    CreateWithdrawRequestMutation,
    CreateWithdrawRequestMutationVariables
  >(CREATE_WITHDRAW_REQUEST);

  const createWithdrawBonus = (input: CreateWithdrawRequestInput) => {
    return mutate({ variables: { data: input } });
  };

  return {
    createWithdrawBonus,
    data,
    loading,
    error,
  };
};
