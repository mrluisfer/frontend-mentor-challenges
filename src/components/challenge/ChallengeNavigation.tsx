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

export default function ChallengeNavigation({ challengeName }: { challengeName: string }) {
	const formattedChallengeName = challengeName.replace(/-/g, " ").toLowerCase();
	const renderedChallenge = challengesInitialState.find((challenge) => {
		return (
			challenge.route
				?.replace(/^\/challenge\//, "")
				.replace(/-/g, " ")
				.toLowerCase() === formattedChallengeName
		);
	});

	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Explore more challenges</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className="grid gap-2 p-2 md:w-[300px] md:grid-cols-2 lg:w-[350px]">
							{challengesInitialState?.slice(0, 5).map((challenge) => (
								<ChallengeNavigationItem key={challenge.title} challenge={challenge} />
							))}
							<li className="h-fit rounded-md p-2 text-sm font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800">
								<a href="/">Explore more challenges...</a>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuLink
						href={renderedChallenge?.originUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						Visit original challenge
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
