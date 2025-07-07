// import { useMutation } from '@apollo/client';
// import { gql } from '@apollo/client';

// const CREATE_TRANSACTION = gql`
//   mutation CreateTransaction($data: CreateTransactionInput!) {
//     createTransaction(data: $data) {
//       id
//       to
//       from
//       hash
//       type
//       status
//       amount
//       userId
//       createdAt
//       updatedAt
//     }
//   }
// `;

// export const useCreateTransaction = () => {
//   const [createTransaction, { data, loading, error }] = useMutation(
//     CREATE_TRANSACTION,
//     {
//       onError: (error) => {
//         console.error('Ошибка создания транзакции:', error);
//       },
//       onCompleted: (data) => {
//         console.log('Транзакция создана успешно:', data);
//       },
//     },
//   );

//   return {
//     data,
//     error,
//     loading,
//     createTransaction,
//   };
// };
