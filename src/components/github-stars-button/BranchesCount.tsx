import { GitBranchIcon } from "lucide-react";

interface Props {
	count: number;
}

export default function BranchesCount({ count }: Props) {
	return (
		<div className="flex items-center gap-1">
			<GitBranchIcon size={16} strokeWidth={2} aria-hidden="true" />
			<span>Branches: {count}</span>
		</div>
	);
}
