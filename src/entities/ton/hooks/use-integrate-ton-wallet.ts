import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const INTEGRATE_TON_WALLET = gql`
  mutation IntegrateTonWalletToUser($data: IntegrateTonWalletToUserInput!) {
    integrateTonWalletToUser(data: $data) {
      id
      tgId
      username
      firstName
      lastName
      tonAddress
      balance
      createdAt
      updatedAt
    }
  }
`;

export const useIntegrateTonWalletToUser = () => {
  const [integrateTonWallet, { data, loading, error }] = useMutation(
    INTEGRATE_TON_WALLET,
    {
      onError: (error) => {
        console.error('Ошибка интеграции TON кошелька:', error);
      },
      onCompleted: (data) => {
        console.log('TON кошелек успешно интегрирован:', data);
      },
    },
  );

  const integrateWallet = async (address: string) => {
    return integrateTonWallet({
      variables: {
        data: {
          address,
        },
      },
    });
  };

  return {
    data,
    error,
    loading,
    integrateWallet,
  };
};
