import { challengesComponentRender } from "@/constants/challengesComponentRender";
import type { ChallengeSlug } from "@/types/Challenge";
import ChallengeNotFound from "./ChallengeNotFound";

type ChallengeRenderProps = {
	challengeName: string;
};

export default function ChallengeRender({ challengeName }: ChallengeRenderProps) {
	const ChallengeComponent = challengesComponentRender[challengeName as ChallengeSlug];

	if (!ChallengeComponent) {
		return <ChallengeNotFound slug={challengeName} />;
	}

	return <ChallengeComponent />;
}
