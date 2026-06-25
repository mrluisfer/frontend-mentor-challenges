import { challengesComponentRender } from "@/constants/challengesComponentRender";
import type { ChallengeSlug } from "@/types/Challenge";

type ChallengeRenderProps = {
	challengeName: string;
};

export default function ChallengeRender({ challengeName }: ChallengeRenderProps) {
	const ChallengeComponent = challengesComponentRender[challengeName as ChallengeSlug];

	if (!ChallengeComponent) {
		return (
			<div>
				{/*TODO: work on an beauty 404 challenge*/}
				Challenge not found!
			</div>
		);
	}

	return <ChallengeComponent />;
}
