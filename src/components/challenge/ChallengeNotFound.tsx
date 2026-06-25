import { Home, SearchX } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { challengesInitialState } from "@/constants/challenges";

// Friendly empty state shown when a challenge slug doesn't resolve to a real
// challenge — used both by ChallengeRender (client safety net) and 404.astro.
export default function ChallengeNotFound({ slug }: { slug?: string }) {
	const label = slug?.replace(/-/g, " ").trim();
	const suggestions = challengesInitialState.slice(0, 4);

	return (
		<section className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-7 px-4 py-16 text-center">
			<div className="relative flex items-center justify-center">
				<span
					aria-hidden="true"
					className="text-muted-foreground/15 text-[7rem] leading-none font-extrabold tracking-tighter select-none sm:text-[9rem]"
				>
					404
				</span>
				<SearchX
					aria-hidden="true"
					strokeWidth={1.75}
					className="absolute size-12 text-yellow-400 sm:size-14"
				/>
			</div>

			<div className="space-y-2">
				<h1 className="text-2xl font-bold sm:text-3xl">Challenge not found</h1>
				<p className="text-muted-foreground mx-auto max-w-md text-sm sm:text-base">
					{label ? (
						<>
							We couldn&apos;t find a challenge called{" "}
							<span className="text-foreground font-medium">&ldquo;{label}&rdquo;</span>. It may
							have moved or never existed.
						</>
					) : (
						<>This challenge doesn&apos;t exist or may have moved.</>
					)}
				</p>
			</div>

			{suggestions.length > 0 && (
				<div className="flex flex-col items-center gap-3">
					<p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
						Try one of these
					</p>
					<ul className="flex max-w-md flex-wrap items-center justify-center gap-2">
						{suggestions.map((challenge) => (
							<li key={challenge.slug}>
								<a
									href={challenge.route}
									className="border-border bg-card hover:bg-muted focus-visible:ring-ring inline-block rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
								>
									{challenge.title}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}

			<a href="/" className={cn(buttonVariants(), "gap-2")}>
				<Home className="size-4" aria-hidden="true" />
				Back to all challenges
			</a>
		</section>
	);
}
