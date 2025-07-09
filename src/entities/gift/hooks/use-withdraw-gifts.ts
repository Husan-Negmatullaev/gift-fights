import { useMutation } from "@apollo/client";
import { graphql } from "@/shared/api/graphql";
import type {
  WithdrawGiftInput,
  WithdrawnGift,
} from "@/shared/api/graphql/graphql";

const WITHDRAW_GIFTS = graphql(`
  mutation WithdrawGifts($data: WithdrawGiftInput!) {
    withdrawGifts(data: $data) {
      id
      title
      slug
      price
    }
  }
`);

export const useWithdrawGifts = () => {
  const [withdrawGiftsMutation, { data, loading, error }] = useMutation<
    WithdrawnGift,
    { data: WithdrawGiftInput }
  >(WITHDRAW_GIFTS);

  const withdrawGifts = (variables: WithdrawGiftInput) => {
    return withdrawGiftsMutation({ variables: { data: variables } });
  };

  return {
    data,
    error,
    loading,
    withdrawGifts,
  };
};
