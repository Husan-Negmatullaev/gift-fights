import { AVATAR_SIZES_CONSTANTS } from '@/shared/constants/avatar-constants';
import type { AvatarSizesType } from '@/shared/types/avatar-types';
import clsx from 'clsx';

type AvatarProps = {
  url: string;
  className?: string;
  size: AvatarSizesType;
};

export const Avatar = (props: AvatarProps) => {
  const { size, url, className } = props;

  return (
    <div className={clsx(className, 'rounded-full')}>
      <img
        src={url}
        alt="user avatar"
        className={clsx(AVATAR_SIZES_CONSTANTS[size])}
      />
    </div>
  );
};
