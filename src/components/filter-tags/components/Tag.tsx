import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import type { Dispatch, SetStateAction } from "react";

type FilterTagProps = {
	tag: string;
	setSelectedTags: Dispatch<SetStateAction<string[]>>;
	selectedTags: Array<string>;
};
export default function FilterTag({ tag, setSelectedTags, selectedTags }: FilterTagProps) {
	const tagId = `popover-${tag}`;

	const handleCheckedChange = (checked: boolean) => {
		if (checked) {
			setSelectedTags((prevSelected) => [...prevSelected, tag]);
			return;
		}

		if (!checked) {
			const filteredArray = selectedTags.filter((selectedTag) => selectedTag !== tag);
			setSelectedTags(filteredArray);
		}
	};

	return (
		<div className="flex items-center gap-2 text-base">
			<Checkbox
				id={tagId}
				onCheckedChange={handleCheckedChange}
				checked={selectedTags.includes(tag)}
			/>
			<Label htmlFor={tagId} className="font-normal">
				{tag}
			</Label>
		</div>
	);
}
