import type { ProfileQuery } from '@/shared/api/graphql/graphql';
import { Avatar } from '@/shared/ui/avatar/avatar';

type ProfileInformationProps = {
  profile: ProfileQuery['profile'];
};

export const ProfileInformation = (props: ProfileInformationProps) => {
  const { profile } = props;

  return (
    <article className="overflow-hidden relative bg-linear-180 from-blue-50 to-blue-100 text-white">
      <div className="grid gap-2 place-items-center relative p-4">
        {profile.image && <Avatar url={profile.image} className="size-24" />}

        <h1 className="text-xl/6 font-medium">{profile.displayName}</h1>
        <p>{profile.username}</p>
      </div>
      <img
        alt="telegrams"
        src="/assets/images/play/telegrams.webp"
        className="absolute -top-[30%] pointer-events-none"
      />
    </article>
  );
};
