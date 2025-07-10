import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_URL = `${import.meta.env.VITE_DOMAIN}/graphql`;

const MOCK_TELEGRAM_AUTH =
  'query_id=AAHTmpAvAAAAANOakC-stxJc&user=%7B%22id%22%3A798005971%2C%22first_name%22%3A%22HUSAN%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Husan203%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FRDGUIBFtIMJxlvGNI_Q5WUJj7w9Fo5lLre75kJq0kyI.svg%22%7D&auth_date=1751892088&signature=u8xAlqA2qvlRxnIIEUFZNa50PYpqT0x1igtaTkyQ7hDHDUFV_JU5N4FjFYTjtKq8ZCkQQZHz9elu8u-JNXpNDQ&hash=16fb51f6ca53fce70da0433c9093f4625b836eb634cc4d756f565dfa82960ea3';
// const MOCK_TELEGRAM_AUTH_BOBUR =
//   "query_id=AAEam7YWAAAAABqbthanBjMI&user=%7B%22id%22%3A381066010%2C%22first_name%22%3A%22%E2%88%A8%E4%B8%B9%E3%84%A5%E3%84%A5%E5%B7%A5%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22nazirov1108%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FyYriKOQ8dVQZpQugRYHpHgPpy9D1XyDiSqDdDYjFe14.svg%22%7D&auth_date=1752071815&signature=R7FlELi9NJDZ3KZBM5VV2X4kDFY3gvi2x2exQu_-dT4cCZxO0D5k3qwLDcz6XvlONqucWuqVOCAJJ0BVwhXYDQ&hash=137893e50c7e98f71bb5c47c62a78334cd8bfff12b8a8bec5f8c7f68fe42f26b";
// const MOCK_TELEGRAM_AUTH_AX =
//   'query_id=AAEvMR8XAwAAAC8xHxd5HZSg&user=%7B%22id%22%3A6830371119%2C%22first_name%22%3A%22%D0%A5%D1%83%D1%81%D0%B0%D0%BD%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22HusanAX%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FT5q0b4-Ep-Xr8PjtLnrrPBqPNACkKKBSgEMcCVTmIEdfukcdGoTPcUM1j5hcs3oG.svg%22%7D&auth_date=1751903100&signature=HPg-kE_5fAlJ4A9Hzt0C1XIQstXrBy0NWGfpBrj-jE__58eWtKY1oFTnjZBIVa-aVHpB7SC_-4oF1V_fSqKWAg&hash=72f7d688cc78491908ec3b30ffc75c5a5845deedf8416724b4cb78fa8b384ace';

// const isAnother = confirm('another AX');

const DEV_TELEGRAM_AUTH = import.meta.env.DEV
  ? MOCK_TELEGRAM_AUTH
  : window.Telegram?.WebApp?.initData;

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  const initData = DEV_TELEGRAM_AUTH;

  return {
    headers: {
      ...headers,
      Authorization: initData,
    },
  };
});

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: "no-cache",
  //   },
  //   watchQuery: {
  //     fetchPolicy: "no-cache",
  //   },
  //   mutate: {
  //     fetchPolicy: "no-cache",
  //   },
  // },
});
