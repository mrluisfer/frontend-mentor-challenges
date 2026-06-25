import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuContent,
} from "../ui/navigation-menu";
import { challengesInitialState } from "@/constants/challenges";
import ChallengeNavigationItem from "./ChallengeNavigationItem";
import { ExternalLinkIcon } from "lucide-react";

export default function ChallengeNavigation({ challengeName }: { challengeName: string }) {
	const currentChallenge = challengesInitialState.find(
		(challenge) => challenge.slug === challengeName
	);
	// Show every challenge except the one currently being viewed, so the
	// navigation only points to other challenges.
	const otherChallenges = challengesInitialState.filter(
		(challenge) => challenge.slug !== challengeName
	);

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Explore more challenges</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-2 p-2 md:w-[300px] md:grid-cols-2 lg:w-[350px]">
							{otherChallenges.map((challenge) => (
								<ChallengeNavigationItem key={challenge.slug} challenge={challenge} />
							))}
							<li className="h-fit rounded-md p-2 text-sm font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800">
								<a href="/">Explore more challenges...</a>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				{currentChallenge?.originUrl && (
					<NavigationMenuItem>
						<NavigationMenuLink
							href={currentChallenge.originUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							Visit original challenge
							<ExternalLinkIcon />
						</NavigationMenuLink>
					</NavigationMenuItem>
				)}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
