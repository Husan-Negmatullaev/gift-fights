import { useTelegram } from "../hooks/use-telegram";
import { Icons } from "@/shared/ui/icons/icons";
import clsx from "clsx";

export const TelegramAvatar = () => {
  const telegram = useTelegram();

  const avatarUrl = telegram.initDataUnsafe.user?.photo_url;

  return (
    <div
      className={clsx(
        avatarUrl && "border-blue",
        !avatarUrl && "border-white",
        "grid place-items-center border border-blue rounded-full overflow-hidden size-9",
      )}
    >
      {avatarUrl && <img alt="telegram user avatar" src={avatarUrl} />}
      {!avatarUrl && <Icons name="user" width={24} height={24} />}
    </div>
  );
};
