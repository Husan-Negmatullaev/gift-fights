import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const GRAPHQL_URL = `${import.meta.env.VITE_DOMAIN}/graphql`;
// const WS_URL = `${import.meta.env.VITE_WS_DOMAIN}/socket.io`;

const isAX = confirm("IS AX");

const MOCK_TELEGRAM_AUTH_AX =
  "query_id=AAHTmpAvAAAAANOakC-zW9gr&user=%7B%22id%22%3A798005971%2C%22first_name%22%3A%22HUSAN%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Husan203%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FRDGUIBFtIMJxlvGNI_Q5WUJj7w9Fo5lLre75kJq0kyI.svg%22%7D&auth_date=1751628059&signature=JJlnrZAfehlFuyVTj1sU7TrKPWXZ22a_eZAgF_5-VCzOh5tQO3UWRq5eccYpM4VNuO_e2MFikKkH3PCjZJEXDw&hash=7eabbb7bd7b521c2247d6819814e4ae7f49f786c5be1fefec2803527e14b85a5";
const MOCK_TELEGRAM_AUTH =
  "query_id=AAEvMR8XAwAAAC8xHxfDqRO6&user=%7B%22id%22%3A6830371119%2C%22first_name%22%3A%22%D0%A5%D1%83%D1%81%D0%B0%D0%BD%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22HusanAX%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FT5q0b4-Ep-Xr8PjtLnrrPBqPNACkKKBSgEMcCVTmIEdfukcdGoTPcUM1j5hcs3oG.svg%22%7D&auth_date=1751658540&signature=B-3jSrR9DXBWT7yntqnmZO8UzI10-dctaDzf7OhOeEnlIbjotQ2mKuAjYsITF0-P_1YP0_Lv2VrX-4vaB8j-Aw&hash=a3650d96580dbacaa95b75c3e21a982e982afe7cc57235dfdba0f2f85ad303a5";

const DEV_TELEGRAM_AUTH = import.meta.env.DEV
  ? isAX
    ? MOCK_TELEGRAM_AUTH
    : MOCK_TELEGRAM_AUTH_AX
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
});
