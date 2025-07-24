let MOCK_TELEGRAM_AUTH =
  'query_id=AAHTmpAvAAAAANOakC9qsg2t&user=%7B%22id%22%3A798005971%2C%22first_name%22%3A%22HUSAN%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Husan203%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FRDGUIBFtIMJxlvGNI_Q5WUJj7w9Fo5lLre75kJq0kyI.svg%22%7D&auth_date=1752331591&signature=LlRUPfO7dYEzzyWQNDJ4mIMjatOQuKVW4IGshRrO7e4bsMCDXEyeMAVyfNSb8LFIQ0MYfufumUK6jwAQbiK4Ag&hash=eda526a7406eff6603a0eb0930c5cb24649122800ed56b35befab5044581fc60';

if (confirm('IS AX')) {
  MOCK_TELEGRAM_AUTH =
    'query_id=AAF-IPwYAAAAAH4g_BgC2lD6&user=%7B%22id%22%3A419176574%2C%22first_name%22%3A%22droggeljug%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22droggeljug%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FGLZY3ED6eA8-rClEA--rwC7aiSt28gr5r38Uyy32UUw.svg%22%7D&auth_date=1753303431&signature=Ajrk3VK9FTbO_f16paJj7t-S1gE1bmQN5IJa6hD_4OYvR5UnwL5ZTAUsGioFz6jRGAIdCTZZOjncXh-G8KkuAA&hash=c38c3db7a0510d637699f1e3bc7e1f380b5eb9b4a06e74d4ab69b9ee56f8126a';
}

const DEV_TELEGRAM_AUTH = import.meta.env.DEV
  ? MOCK_TELEGRAM_AUTH
  : window.Telegram?.WebApp?.initData;

export { DEV_TELEGRAM_AUTH };
