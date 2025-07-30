import { graphql } from '@/shared/api/graphql';
import type { ProfileQuery } from '@/shared/api/graphql/graphql';
import { useQuery } from '@apollo/client';

const PROFILE = graphql(`
  query Profile {
    profile {
      id
      tgId
      image
      username
      lastName
      firstName
      tonAddress
      referralCode
      referredBy
      bonuses
      balance
      displayName
      winRate
      wins
      losses
      referrals {
        id
        username
        image
      }
      withdrawnGifts {
        status
        transactionId
        userId
        giftId
        gift {
          id
          title
          slug
          model
          symbol
          background
          blocked
          withdrawn
          withdrawable
          place
          isReward
          rewardWasTransferred
          price
          symbolPermille
          rarityPermille
          backgroundPermille
          msgId
          externalId
          userId
          createdAt
          updatedAt
        }
      }
      gifts {
        id
        title
        slug
        model
        symbol
        background
        blocked
        withdrawn
        withdrawable
        place
        isReward
        rewardWasTransferred
        price
        symbolPermille
        rarityPermille
        backgroundPermille
        msgId
        externalId
        userId
        createdAt
        updatedAt
      }
    }
  }
`);

export const useProfile = () => {
  const { data, loading, error, refetch } = useQuery<ProfileQuery>(PROFILE);

  return {
    error,
    loading,
    refetch,
    profile: data?.profile,
  };
};
