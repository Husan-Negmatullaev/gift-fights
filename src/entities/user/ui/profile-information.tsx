import type { ProfileQuery } from "@/shared/api/graphql/graphql";
import { Avatar } from "@/shared/ui/avatar/avatar";

type ProfileInformationProps = {
	profile: ProfileQuery["profile"];
};

export const ProfileInformation = (props: ProfileInformationProps) => {
	const { profile } = props;

	return (
		<article className="overflow-hidden relative text-white">
			<div className="grid  place-items-center relative p-4">
				{profile.image && (
					<Avatar url={profile.image} className="size-25 mb-2" />
				)}

				<h1 className="text-[24px] font-bold">{profile.displayName}</h1>
				<p className="text-[#A8A8A8]">{profile.username}</p>
			</div>
		</article>
	);
};
