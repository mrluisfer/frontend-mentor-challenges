import { useRef, type ChangeEvent } from "react";
import { useChallengesStore } from "@/stores/challengesStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";

export default function SearchBar() {
	const { setQueryChallenges, queryChallenges, resetFilter, filterChallengesByTitle } =
		useChallengesStore();
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleSubmitFilterChallenges = () => {
		setQueryChallenges(queryChallenges);
		if (!queryChallenges) {
			resetFilter();
			return;
		}
		filterChallengesByTitle(queryChallenges);
	};

	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (value.length > 45) return;
		setQueryChallenges(value);
		if (!value) {
			resetFilter();
		}
		filterChallengesByTitle(value);
	};

	const handleClickClearInput = () => {
		setQueryChallenges("");
		resetFilter();
		inputRef.current?.focus();
	};

	return (
		<form
			className="flex w-full flex-col items-start justify-center gap-2 md:w-auto md:justify-end lg:w-96"
			onSubmit={(submitEvent) => {
				submitEvent.preventDefault();
				handleSubmitFilterChallenges();
			}}
		>
			<Label htmlFor="input-26">Search challenge by name:</Label>
			<div className="relative w-full">
				<Input
					id="input-26"
					className="peer pe-9 ps-9"
					placeholder="Search..."
					type="search"
					onChange={handleChangeInput}
					value={queryChallenges}
				/>
				<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
					<Search size={16} strokeWidth={2} />
				</div>
				<button
					className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
					aria-label="Submit search"
					type="button"
					disabled={!queryChallenges || !queryChallenges?.length}
					onClick={handleClickClearInput}
				>
					<X size={16} strokeWidth={2} aria-hidden="true" />
				</button>
			</div>
		</form>
	);
}
