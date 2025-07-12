let MOCK_TELEGRAM_AUTH =
  "query_id=AAHTmpAvAAAAANOakC_e08XL&user=%7B%22id%22%3A798005971%2C%22first_name%22%3A%22HUSAN%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Husan203%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FRDGUIBFtIMJxlvGNI_Q5WUJj7w9Fo5lLre75kJq0kyI.svg%22%7D&auth_date=1752326497&signature=RrCL8nN_W6_FYFILGOAsGKK39dwAF5LgWpkzNIxXs8ZnZTOJ-p8vdkAIe78v4V8HM7bhjaOlybaUwBUJCZP3Ag&hash=a7466b6373b356df7a68c1862ff52f828734fe6a980758ee716e4e0d35696435";

// if (confirm("IS AX")) {
//   MOCK_TELEGRAM_AUTH =
//     "query_id=AAEvMR8XAwAAAC8xHxf6PG6m&user=%7B%22id%22%3A6830371119%2C%22first_name%22%3A%22%D0%A5%D1%83%D1%81%D0%B0%D0%BD%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22HusanAX%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FT5q0b4-Ep-Xr8PjtLnrrPBqPNACkKKBSgEMcCVTmIEdfukcdGoTPcUM1j5hcs3oG.svg%22%7D&auth_date=1752326567&signature=Eu3GKJYE9bhov_KZ20_jYEwSbsIwycg3RgN2FE0ztxfOL9KY0QAyQjONFzeQHRxaZzfYWX_TS3x2pclF8zfwBg&hash=9a767212dcf49e198cfaff418ecfa74b5c61086658d955b90f1daba4ecaea024";
// }

const DEV_TELEGRAM_AUTH = import.meta.env.DEV
  ? MOCK_TELEGRAM_AUTH
  : window.Telegram?.WebApp?.initData;

export { DEV_TELEGRAM_AUTH };
