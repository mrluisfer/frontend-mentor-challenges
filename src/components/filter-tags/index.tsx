import { tags } from "@/constants/challenges";
import FilterTag from "./components/Tag";
import { Label } from "@components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ListFilter } from "lucide-react";
import { useChallengesStore } from "@/stores/challengesStore";
import { type SubmitEvent, useState } from "react";

export default function Filter() {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [open, setOpen] = useState(false);
	const technologiesList = Object.values(tags);
	const { filterChallengesByTagName: filterChallengesByName, resetFilter } = useChallengesStore();

	const handleSubmitFilter = (event: SubmitEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (!selectedTags.length) return;
		filterChallengesByName(selectedTags);
		setOpen(false);
	};

	const handleClickClearFilter = () => {
		setSelectedTags([]);
		resetFilter();
		setOpen(false);
	};

	return (
		<section className="flex flex-row items-center justify-center gap-2 sm:justify-start">
			<section className="flex items-center gap-3">
				<div className="flex flex-col gap-4">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger
							render={<Button variant="outline" size="icon" aria-label="Filters" id="filters" />}
						>
							<ListFilter size={16} strokeWidth={2} aria-hidden="true" />
						</PopoverTrigger>
						<PopoverContent className="min-w-36 p-3">
							<div className="space-y-3">
								<div className="text-muted-foreground text-xs font-medium">Filters</div>
								<form className="space-y-3" onSubmit={handleSubmitFilter}>
									{technologiesList.map((tag) => (
										<FilterTag
											tag={tag}
											key={tag}
											setSelectedTags={setSelectedTags}
											selectedTags={selectedTags}
										/>
									))}
									<div
										role="separator"
										aria-orientation="horizontal"
										className="bg-border -mx-3 my-1 h-px"
									></div>
									<div className="flex justify-between gap-2">
										<Button variant={"ghost"} onClick={handleClickClearFilter}>
											Clear
										</Button>
										<Button type="submit" disabled={!selectedTags.length}>
											Apply
										</Button>
									</div>
								</form>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</section>
			<Label htmlFor="filters" className="flex gap-2">
				Filter by Technologies
			</Label>
		</section>
	);
}
