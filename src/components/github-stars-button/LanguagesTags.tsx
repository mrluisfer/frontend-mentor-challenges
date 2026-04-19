import { Badge } from "../ui/badge";

interface Props {
	languages: string[];
}

export default function LanguagesTags({ languages }: Props) {
	if (languages.length === 0) return null;

	return (
		<div className="flex flex-wrap gap-1">
			{languages.map((tag) => (
				<Badge key={tag} variant="secondary" className="text-xs font-medium">
					{tag}
				</Badge>
			))}
		</div>
	);
}
