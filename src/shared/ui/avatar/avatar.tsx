import clsx from 'clsx';

type AvatarProps = {
  url: string;
  className: string;
  // size: AvatarSizesType;
};

export const Avatar = (props: AvatarProps) => {
  const { url, className } = props;

  return (
    <div
      className={clsx(
        className,
        // AVATAR_SIZES_CONSTANTS[size],
        'rounded-full overflow-hidden',
      )}>
      <img src={url} alt="user avatar" className="size-full" />
    </div>
  );
};
