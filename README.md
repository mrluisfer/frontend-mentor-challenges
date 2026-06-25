# JS Challenges Hub

A collection of [Frontend Mentor](https://www.frontendmentor.io/) challenges built and hosted together in a single [Astro](https://astro.build/) site. Each challenge is a self-contained React + TypeScript app, rendered as an Astro island, and accessible from a shared landing page.

> **Live site:** _<!-- TODO: add your deployment URL, e.g. https://js-challenges-hub.vercel.app -->_

## Overview

Instead of one repository per challenge, this project groups every solution under a single, well-structured codebase:

- A **landing page** lists all challenges with their difficulty level, tags, and a link to the original Frontend Mentor brief.
- Each challenge lives in `src/challenges/<name>/` with its own components, styles, and logic colocated.
- Shared UI primitives, hooks, and utilities are reused across challenges to keep things DRY.

## Tech stack

| Area         | Tools                                                    |
| ------------ | -------------------------------------------------------- |
| Framework    | Astro 7 (with React islands)                             |
| UI           | React 19, TypeScript                                     |
| Styling      | Tailwind CSS v4, design tokens via CSS custom properties |
| Components   | Base UI, Radix UI, shadcn-style primitives, lucide-react |
| State / data | Jotai, Zustand, Axios, localForage                       |
| Maps         | Leaflet / react-leaflet (IP Tracker)                     |
| Tooling      | ESLint, Prettier, Husky, Commitlint, pnpm                |
| Hosting      | Vercel                                                   |

## Challenges

| Challenge                                                             | Level        | Tags                  | Brief                                                                                                               |
| --------------------------------------------------------------------- | ------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [Weather app](./src/challenges/weather-app-main)                      | Junior       | HTML · CSS · JS · API | [↗](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49)                                                |
| [Age Calculator](./src/challenges/age-calculator)                     | Junior       | HTML · CSS · JS       | [↗](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q)                                         |
| [Interactive Comments Section](./src/challenges/interactive-comments) | Intermediate | HTML · CSS · JS       | [↗](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9)                                |
| [IP Address Tracker](./src/challenges/ip-tracker)                     | Intermediate | HTML · CSS · JS · API | [↗](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0)                                          |
| [REST Countries API](./src/challenges/rest-countries)                 | Intermediate | HTML · CSS · JS · API | [↗](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca) |
| [QR Code Component](./src/challenges/qr-card)                         | Newbie       | HTML · CSS            | [↗](https://www.frontendmentor.io/challenges/qr-code-component-iux_sIO_H)                                           |

Each challenge is reachable at `/challenge/<name>` once the site is running.

## Project structure

```
src/
├── challenges/            # one folder per Frontend Mentor solution
│   └── weather-app-main/
│       ├── components/    # UI for this challenge
│       ├── lib/           # api, formatting, types (logic separated from UI)
│       ├── assets/        # images & fonts for this challenge
│       └── index.tsx      # challenge entry point (React island)
├── components/            # shared UI primitives (ui/), challenge list, etc.
├── layouts/               # Astro layouts (BaseLayout, ChallengeLayout)
├── pages/                 # Astro routes
├── constants/             # challenge metadata (challenges.ts)
├── styles/                # global.css (Tailwind + design tokens)
└── lib/ · hooks/ · types/ # cross-cutting helpers
```

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org/) 18+ and [pnpm](https://pnpm.io/) (the repo pins `pnpm@11.9.0`).

```bash
# install dependencies
pnpm install

# start the dev server (http://localhost:4321)
pnpm dev

# type-check + production build
pnpm build

# preview the production build locally
pnpm preview
```

### Useful scripts

| Script          | Description                                 |
| --------------- | ------------------------------------------- |
| `pnpm dev`      | Run the Astro dev server                    |
| `pnpm build`    | Build the static site to `dist/`            |
| `pnpm preview`  | Serve the built site locally                |
| `pnpm lint`     | Lint with ESLint (TypeScript + React rules) |
| `pnpm prettier` | Format and check with Prettier              |

## Notes on quality

- **Architecture** — Per challenge, network access and data shaping live in `lib/` so components stay focused on rendering (see `weather-app-main/lib/api.ts`).
- **Accessibility** — Shared patterns include a keyboard-visible skip link, visible focus styles, live-region announcements for loading/error states, semantic landmarks, and ARIA combobox/menu semantics for custom widgets.
- **Performance** — Google Fonts are loaded through a single combined `<link>` in the document head (with `preconnect`) instead of chained `@import`s, avoiding render-blocking request chains.

## Acknowledgments

Challenges by [Frontend Mentor](https://www.frontendmentor.io/). Solutions and the surrounding hub built by [@mrluisfer](https://github.com/mrluisfer).
