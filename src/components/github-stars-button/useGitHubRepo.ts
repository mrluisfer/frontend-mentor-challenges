import type { GitHubRepository } from "@/types/GitHubRepository";
import { useEffect, useState } from "react";

const OWNER = "mrLuisFer";
const REPO = "js-challenges-hub";
const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;
const CACHE_KEY = `gh-repo:${OWNER}/${REPO}`;
const CACHE_TTL = 5 * 60 * 1000;

export interface RepoBundle {
	repo: GitHubRepository;
	branchesCount: number;
	languages: string[];
}

interface CacheEntry {
	timestamp: number;
	data: RepoBundle;
}

let inFlight: Promise<RepoBundle> | null = null;
let memoryCache: CacheEntry | null = null;

async function fetchJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
	const res = await fetch(url, {
		signal,
		headers: { Accept: "application/vnd.github+json" },
	});
	if (!res.ok) {
		if (res.status === 403) throw new Error("GitHub API rate limit exceeded");
		throw new Error(`GitHub API error: ${res.status}`);
	}
	return res.json() as Promise<T>;
}

function readCache(): RepoBundle | null {
	if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_TTL) {
		return memoryCache.data;
	}
	try {
		const raw = localStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as CacheEntry;
		if (Date.now() - parsed.timestamp > CACHE_TTL) return null;
		memoryCache = parsed;
		return parsed.data;
	} catch {
		return null;
	}
}

function writeCache(data: RepoBundle) {
	const entry: CacheEntry = { timestamp: Date.now(), data };
	memoryCache = entry;
	try {
		localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
	} catch {
		// Storage quota or disabled — cache in-memory only
	}
}

async function loadRepoBundle(): Promise<RepoBundle> {
	const [repo, branches, languages] = await Promise.all([
		fetchJSON<GitHubRepository>(BASE),
		fetchJSON<unknown[]>(`${BASE}/branches`),
		fetchJSON<Record<string, number>>(`${BASE}/languages`),
	]);
	return {
		repo,
		branchesCount: branches.length,
		languages: Object.keys(languages),
	};
}

interface State {
	data: RepoBundle | null;
	loading: boolean;
	error: string | null;
}

export function useGitHubRepo(): State {
	const [state, setState] = useState<State>(() => {
		const cached = readCache();
		return cached
			? { data: cached, loading: false, error: null }
			: { data: null, loading: true, error: null };
	});

	useEffect(() => {
		if (state.data) return;
		let active = true;

		if (!inFlight) {
			inFlight = loadRepoBundle()
				.then((data) => {
					writeCache(data);
					return data;
				})
				.finally(() => {
					inFlight = null;
				});
		}

		inFlight
			.then((data) => {
				if (active) setState({ data, loading: false, error: null });
			})
			.catch((err: unknown) => {
				if (!active) return;
				const message = err instanceof Error ? err.message : "Unknown error";
				setState({ data: null, loading: false, error: message });
			});

		return () => {
			active = false;
		};
	}, [state.data]);

	return state;
}
