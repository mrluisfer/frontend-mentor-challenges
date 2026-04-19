export default function CountrySkeleton() {
	return (
		<div
			className="flex flex-col overflow-hidden rounded-lg bg-[var(--rest-white)] shadow-md dark:bg-[var(--rest-dark-blue)]"
			aria-hidden="true"
		>
			<div className="aspect-[5/3] w-full animate-pulse bg-[var(--rest-very-light-gray)] dark:bg-[var(--rest-very-dark-value)]" />
			<div className="flex flex-col gap-3 p-6 pb-10">
				<div className="h-5 w-3/4 animate-pulse rounded bg-[var(--rest-very-light-gray)] dark:bg-[var(--rest-very-dark-value)]" />
				<div className="flex flex-col gap-2">
					<div className="h-3 w-2/3 animate-pulse rounded bg-[var(--rest-very-light-gray)] dark:bg-[var(--rest-very-dark-value)]" />
					<div className="h-3 w-1/2 animate-pulse rounded bg-[var(--rest-very-light-gray)] dark:bg-[var(--rest-very-dark-value)]" />
					<div className="h-3 w-2/5 animate-pulse rounded bg-[var(--rest-very-light-gray)] dark:bg-[var(--rest-very-dark-value)]" />
				</div>
			</div>
		</div>
	);
}
