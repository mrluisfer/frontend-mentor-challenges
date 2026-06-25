import type { AllRoutes } from "@/enums/AllRoutes";
import type { Level } from "./Level";

// Stable identifier for each challenge — the single join key shared by the
// metadata list (challenges.ts), the component registry
// (challengesComponentRender.ts), the derived route, and navigation.
export type ChallengeSlug =
	| "age-calculator"
	| "interactive-comments"
	| "qr-card"
	| "ip-tracker"
	| "rest-countries"
	| "weather-app";

export type Challenge = {
	slug: ChallengeSlug;
	title: string;
	description: string;
	image?: string;
	level: Level;
	tags: string[];
	// Derived from `slug` as `/challenge/${slug}` in challenges.ts.
	route?: string;
	originUrl?: string;
};

export type ChallengeTitles = keyof typeof AllRoutes;
