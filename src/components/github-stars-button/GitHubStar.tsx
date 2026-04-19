import { Star } from "lucide-react";

export default function GitHubStar() {
	return (
		<Star
			size={16}
			strokeWidth={2}
			className="shrink-0 text-current transition-all duration-300 group-hover:scale-110 group-hover:fill-amber-400 group-hover:text-amber-400 group-hover:drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
			aria-hidden="true"
		/>
	);
}
