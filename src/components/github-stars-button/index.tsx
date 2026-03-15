import { Button } from "@/components/ui/button";
import { CircleDot } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import type { GitHubRepository } from "@/types/GitHubRepository";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import GitHubIcon from "./GitHubIcon";
import BranchesCount from "./BranchesCount";
import LanguagesTags from "./LanguagesTags";
import { Separator } from "../ui/separator";
import GitHubStar from "./GitHubStar";

export default function GitHubStarsButton() {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchStars = async () => {
			try {
				const response = await axios.get(
					"https://api.github.com/repos/mrluisfer/js-challenges-hub"
				);
				if (response.status !== 200) {
					throw new Error("Invalid response status.");
				}
				const data = response.data as GitHubRepository;
				setRepositoryData(data);
			} catch (err) {
				setError("Error fetching repository data.");
				throw new Error(JSON.stringify(err));
			} finally {
				setLoading(false);
			}
		};

		fetchStars();
	}, []);

	if (error) return null;

	if (loading) {
		return <Skeleton className="h-8 w-20" />;
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						className="bg-[#181717] text-white filter transition-all hover:bg-[#181717] active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-50"
						render={
							<a
								href="https://github.com/mrLuisFer/js-challenges-hub"
								target="_blank"
								rel="noopener noreferrer"
							/>
						}
					>
						<div className="mr-1 flex h-full items-center gap-2">
							<GitHubStar />
							<Separator className="h-full w-px opacity-20" />
						</div>
						<span className="flex items-baseline gap-2">
							Stars
							<span className="text-xs dark:text-neutral-500">
								{repositoryData?.stargazers_count}
							</span>
						</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent className="flex max-w-xs flex-col gap-2 border bg-white text-black">
					<div className="flex items-center gap-2">
						<GitHubIcon />
						<div>
							{repositoryData?.owner.login} /{" "}
							<span className="font-bold">{repositoryData?.name}</span>
						</div>
					</div>
					<span>{repositoryData?.description}</span>
					<div className="flex justify-start gap-6">
						<div className="flex items-center gap-1">
							<CircleDot size={16} strokeWidth={2} />
							Issues: {repositoryData?.open_issues_count}
						</div>
						<BranchesCount />
					</div>
					<LanguagesTags />
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
