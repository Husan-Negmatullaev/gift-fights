let MOCK_TELEGRAM_AUTH = 'query_id=AAEN9Y8RAwAAAA31jxEqr1JB&user=%7B%22id%22%3A6737097997%2C%22first_name%22%3A%22Bored%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22boredqbf%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FG-xge3DCGTibT4rjwJuLaHxbGrdt1tQRmDSshv2sn2AMH61OAGtoL9LT6G3or8rT.svg%22%7D&auth_date=1753546661&signature=zyxksAqtJQziR8AvT6ZbUJcmOe6ic_49wPROQMVuXCuRRf21Fzs-Lmg58aWg6TfZTiRyHElFC1bb8JsErTh6CA&hash=e93ffdd0945e2d9b8e3e8a27208899aacd48fd0b66f7af1928f57fc16db874b5';


if (import.meta.env.DEV) {
  if (confirm('IS AX')) {
    MOCK_TELEGRAM_AUTH =
      'query_id=AAEvMR8XAwAAAC8xHxf6PG6m&user=%7B%22id%22%3A6830371119%2C%22first_name%22%3A%22%D0%A5%D1%83%D1%81%D0%B0%D0%BD%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22HusanAX%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FT5q0b4-Ep-Xr8PjtLnrrPBqPNACkKKBSgEMcCVTmIEdfukcdGoTPcUM1j5hcs3oG.svg%22%7D&auth_date=1752326567&signature=Eu3GKJYE9bhov_KZ20_jYEwSbsIwycg3RgN2FE0ztxfOL9KY0QAyQjONFzeQHRxaZzfYWX_TS3x2pclF8zfwBg&hash=9a767212dcf49e198cfaff418ecfa74b5c61086658d955b90f1daba4ecaea024';
  }
}

const DEV_TELEGRAM_AUTH = import.meta.env.DEV
  ? MOCK_TELEGRAM_AUTH
  : window.Telegram?.WebApp?.initData;

export { DEV_TELEGRAM_AUTH };
