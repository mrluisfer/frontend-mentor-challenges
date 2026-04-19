export default function NotFound() {
	return (
		<div className="animate-in flex flex-col items-center justify-center gap-6 py-16 text-center">
			<div className="flex flex-col items-center gap-3">
				<span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
					No results found
				</span>
				<h2 className="text-foreground text-2xl font-bold">
					Oops! You&apos;ve wandered off the path&hellip;
				</h2>
				<p className="text-muted-foreground max-w-md">
					We couldn&apos;t find any challenges matching your search. Try adjusting your filters or
					search term.
				</p>
			</div>
			<img
				src="/assets/undraw-adventure.svg"
				alt="Illustration of a person holding a map and a compass"
				className="h-64 w-auto drop-shadow-md"
			/>
		</div>
	);
}
