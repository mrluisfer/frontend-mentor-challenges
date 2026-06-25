import type { Challenge } from "@/types/Challenge";
import ChallengeCardThumbnail from "./components/Thumbnail";
import ChallengeCardHeader from "./components/Header";
import ChallengeCardContent from "./components/Content";
import ChallengeCardTags from "./components/Tags";
import Container from "./components/Container";

export default function ChallengeCard({
	challengeInfo: challenge,
	index,
}: {
	challengeInfo: Challenge;
	index: number;
}) {
	return (
		<a
			href={challenge.route ?? ""}
			key={index}
			className="scale animate-in transition hover:scale-105"
		>
			<Container>
				{challenge?.image ? (
					<ChallengeCardThumbnail src={challenge.image || ""} title={challenge.title} />
				) : null}
				<div className="flex flex-col gap-4 p-4">
					<ChallengeCardHeader title={challenge.title} level={challenge.level} />
					<ChallengeCardContent description={challenge.description} />
					<ChallengeCardTags tags={challenge.tags} />
				</div>
			</Container>
		</a>
	);
}
