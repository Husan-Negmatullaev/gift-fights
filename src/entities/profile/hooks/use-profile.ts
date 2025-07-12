import { graphql } from '@/shared/api/graphql';
import { useQuery } from '@apollo/client';
import type { ProfileQuery } from '@/shared/api/graphql/graphql';

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
      withdrawnGifts {
        id
        slug
        price
        title
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
