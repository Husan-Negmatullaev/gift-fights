import { Icons } from "@/shared/ui/icons/icons";
import clsx from "clsx";

type SafeAvatarProps = {
  url?: string | null;
  className?: string;
  imageClassName?: string;
  iconClassName?: string;
};

export const SafeAvatar = (props: SafeAvatarProps) => {
  const { url, imageClassName, iconClassName, className } = props;

  const avatarUrl = url;

  return (
    <div
      className={clsx(
        className,
        "grid place-items-center rounded-full overflow-hidden",
      )}
    >
      {avatarUrl && (
        <img
          alt="telegram user avatar"
          src={avatarUrl}
          className={imageClassName}
        />
      )}
      {!avatarUrl && (
        <Icons name="user" width={24} height={24} className={iconClassName} />
      )}
    </div>
  );
};
