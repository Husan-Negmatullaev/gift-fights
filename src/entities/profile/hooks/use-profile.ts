import { graphql } from '@/shared/api/graphql';
import { useQuery } from '@apollo/client';
import type { ProfileQuery } from '@/shared/api/graphql/graphql';

const PROFILE = graphql(`
  query Profile {
    profile {
      id
      tgId
      username
      lastName
      firstName
      tonAddress
      referralCode
      referredBy
      balance
      displayName
      # gifts
      # referrer
      # referrals
      # transactions
      # participation
      wonGames {
        id
      }
      withdrawnGifts {
        id
      }
      createdAt
      updatedAt
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
