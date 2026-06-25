import type { ComponentType } from "react";
import type { ChallengeSlug } from "@/types/Challenge";
import AgeCalculator from "@/challenges/age-calculator";
import InteractiveComments from "@/challenges/interactive-comments";
import QrCard from "@/challenges/qr-card";
import IpAddress from "@/challenges/ip-tracker";
import RestCountries from "@/challenges/rest-countries";
import WeatherApp from "@/challenges/weather-app-main";

// Maps each challenge slug to its React component. Typed as a complete Record
// so TypeScript flags a missing or unknown slug whenever challenges are
// added/removed in src/types/Challenge.ts and src/constants/challenges.ts.
export const challengesComponentRender: Record<ChallengeSlug, ComponentType> = {
	"age-calculator": AgeCalculator,
	"interactive-comments": InteractiveComments,
	"qr-card": QrCard,
	"ip-tracker": IpAddress,
	"rest-countries": RestCountries,
	"weather-app": WeatherApp,
};
