import type { Challenge } from "@/types/Challenge";
import { Levels } from "../enums/Levels";

export const tags = {
	html: "HTML",
	css: "CSS",
	js: "JS",
	api: "API",
};

// 👉 To add a new challenge:
//   1. Add its slug to `ChallengeSlug` in src/types/Challenge.ts
//   2. Add an entry to the list below (the `route` is derived from the slug)
//   3. Register its component in src/constants/challengesComponentRender.ts
//      (TypeScript will error until both the slug and the component exist)
const challengeDefs: Omit<Challenge, "route">[] = [
	{
		slug: "age-calculator",
		title: "Age Calculator",
		description:
			"This challenge is designed to sharpen your JavaScript and form validation skills. Working with dates in JavaScript can be tricky, so this will be a nice test!",
		tags: [tags.html, tags.css, tags.js],
		level: Levels.junior,
		image:
			"https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/jmzygkuazktqtg2akkkx.jpg",
		originUrl: "https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q",
	},
	{
		slug: "interactive-comments",
		title: "Interactive Comments Section",
		description:
			"This is project will put your JavaScript skills to the test. We provide a JSON file to pull the data, but it's also a perfect project to build as a full-stack CRUD app!",
		tags: [tags.html, tags.css, tags.js],
		level: Levels.intermediate,
		image:
			"https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/v9wskl4mnbt5gbxm4o2r.jpg",
		originUrl: "https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9",
	},
	{
		slug: "qr-card",
		title: "QR code component",
		description:
			"A perfect first challenge if you are new to HTML and CSS. The card layout does not shift, so it is ideal if you have not learned about building responsive layouts yet.",
		tags: [tags.html, tags.css],
		level: Levels.newbie,
		image:
			"https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/cybxdhr4wewlscvco9dd.jpg",
		originUrl: "https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H",
	},
	{
		slug: "ip-tracker",
		title: "IP Address Tracker",
		description:
			"In this challenge, you will be using two separate APIs together to create an IP Address Tracking app.",
		tags: [tags.html, tags.css, tags.js, tags.api],
		level: Levels.intermediate,
		image:
			"https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/ld4kxbjoxpqpjenak8w6.jpg",
		originUrl: "https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0",
	},
	{
		slug: "rest-countries",
		title: "REST Countries API with color theme switcher",
		description:
			"If you are wanting to test your JavaScript skills this is the challenge for you. Use whichever JS framework you prefer and pull data from the REST Countries API.",
		tags: [tags.html, tags.css, tags.js, tags.api],
		level: Levels.intermediate,
		image:
			"https://res.cloudinary.com/dz209s6jk/image/upload/f_auto,q_auto,w_700/Challenges/wirxeocmd6tpnn9c5oqc.jpg",
		originUrl:
			"https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca",
	},
	{
		slug: "weather-app",
		title: "Weather app",
		description:
			"Build a responsive weather app with search functionality, unit conversion, and detailed forecasts using the Open-Meteo API.",
		tags: [tags.html, tags.css, tags.js, tags.api],
		level: Levels.junior,
		image:
			"https://res.cloudinary.com/dz209s6jk/image/upload/v1757082492/Challenges/ghcrrrc16wimfo9plqmx.jpg",
		originUrl: "https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49",
	},
];

export const challengesInitialState: Challenge[] = challengeDefs.map((challenge) => ({
	...challenge,
	route: `/challenge/${challenge.slug}`,
}));

export const challengesTitles = challengesInitialState.map((challenge) => {
	return challenge.title;
});
