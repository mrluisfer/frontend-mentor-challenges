import { Button } from "@/components/ui/button";
import { CircleDot } from "lucide-react";
import BranchesCount from "./BranchesCount";
import GitHubIcon from "./GitHubIcon";
import GitHubStar from "./GitHubStar";
import LanguagesTags from "./LanguagesTags";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useGitHubRepo } from "./useGitHubRepo";

function formatStars(count: number): string {
	if (count < 1000) return count.toString();
	return `${(count / 1000).toFixed(1)}k`;
}

export default function GitHubStarsButton() {
	const { data, loading, error } = useGitHubRepo();

	if (error) return null;

	if (loading || !data) {
		return <Skeleton className="h-9 w-24 rounded-md" />;
	}

	const { repo, branchesCount, languages } = data;

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger
					render={
						<Button
							className="group relative overflow-hidden bg-neutral-900 text-white shadow-sm transition-all duration-300 hover:bg-neutral-800 hover:shadow-md hover:shadow-amber-200/20 active:scale-95 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:shadow-amber-400/20"
							render={
								<a
									href={repo.html_url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Star ${repo.full_name} on GitHub`}
								/>
							}
						/>
					}
				>
					<div className="flex h-full items-center gap-2">
						<GitHubStar />
						<Separator orientation="vertical" className="h-4 opacity-20" />
					</div>
					<span className="flex items-baseline gap-2">
						<span className="font-medium">Stars</span>
						<span className="tabular-nums text-xs text-neutral-400 transition-colors group-hover:text-amber-400 dark:text-neutral-500">
							{formatStars(repo.stargazers_count)}
						</span>
					</span>
				</TooltipTrigger>
				<TooltipContent className="flex max-w-xs flex-col gap-3 border bg-white p-3 text-black shadow-lg dark:border-neutral-700 dark:bg-neutral-900 dark:text-white">
					<div className="flex items-center gap-2">
						<GitHubIcon className="size-5 shrink-0 dark:fill-white" />
						<div className="truncate">
							<span className="text-neutral-600 dark:text-neutral-400">{repo.owner.login}</span>
							<span className="mx-1 text-neutral-400">/</span>
							<span className="font-bold">{repo.name}</span>
						</div>
					</div>
					{repo.description && (
						<p className="text-sm leading-snug text-neutral-700 dark:text-neutral-300">
							{repo.description}
						</p>
					)}
					<div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
						<div className="flex items-center gap-1">
							<CircleDot size={14} strokeWidth={2} aria-hidden="true" />
							<span>Issues: {repo.open_issues_count}</span>
						</div>
						<BranchesCount count={branchesCount} />
					</div>
					<LanguagesTags languages={languages} />
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
