import type { Challenge } from "@/types/Challenge";
import { Badge } from "../ui/badge";

export default function ChallengeNavigationItem({ challenge }: { challenge: Challenge }) {
	return (
		<li
			key={challenge.title}
			className="h-fit rounded-md p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800"
		>
			<a className="h-full w-full" href={challenge.route}>
				<p className="text-sm font-semibold">{challenge.title}</p>
				<p className="truncate text-xs">{challenge.description}</p>
				<Badge>{challenge.level}</Badge>
			</a>
		</li>
	);
}
