import iconError from "../assets/images/icon-error.svg?url";
import iconRetry from "../assets/images/icon-retry.svg?url";

type ErrorStateProps = {
	onRetry: () => void;
};

export default function ErrorState({ onRetry }: ErrorStateProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
			<img src={iconError} alt="" aria-hidden className="size-12" />
			<h2 className="text-4xl font-bold text-[hsl(0,0%,100%)]">
				Something went wrong
			</h2>
			<p className="max-w-md text-base text-[hsl(240,6%,70%)]">
				We couldn&apos;t connect to the server (API error). Please try again in a
				few moments.
			</p>
			<button
				type="button"
				onClick={onRetry}
				className="mt-2 flex items-center gap-2 rounded-lg bg-[hsl(243,27%,20%)] px-4 py-2.5 text-base font-medium text-[hsl(0,0%,100%)] transition-colors hover:bg-[hsl(243,23%,30%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(0,0%,100%)]"
			>
				<img src={iconRetry} alt="" aria-hidden className="size-4" />
				Retry
			</button>
		</div>
	);
}
