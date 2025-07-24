import { graphql } from "@/shared/api/graphql";
import type {
    ClaimRewardMutation,
    ClaimRewardMutationVariables,
} from "@/shared/api/graphql/graphql";
import { useMutation } from "@apollo/client";

const CLAIM_REWARD = graphql(`
  mutation ClaimReward($questId: Int!) {
    claimReward(questId: $questId) {
      id
      progress
      completed
      completedAt
      lastReset
      userId
      questId
      createdAt
      updatedAt
    }
  }
`);

/**
 * Hook for claiming quest rewards
 * 
 * @example
 * ```tsx
 * const { claimReward, loading, error, data } = useClaimReward();
 * 
 * const handleClaimReward = async () => {
 *   try {
 *     const result = await claimReward(2); // questId: 2
 *     console.log('Reward claimed:', result.data?.claimReward);
 *   } catch (error) {
 *     console.error('Failed to claim reward:', error);
 *   }
 * };
 * ```
 */
export const useClaimReward = () => {
    const [mutate, { data, loading, error }] = useMutation<
        ClaimRewardMutation,
        ClaimRewardMutationVariables
    >(CLAIM_REWARD);

    const claimReward = (questId: number) => {
        return mutate({ variables: { questId } });
    };

    return {
        data: data?.claimReward,
        error,
        loading,
        claimReward,
    };
}; 