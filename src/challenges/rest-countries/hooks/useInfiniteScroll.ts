import { useEffect, useRef, useState } from "react";

type Options = {
	total: number;
	pageSize?: number;
	rootMargin?: string;
};

export function useInfiniteScroll({ total, pageSize = 20, rootMargin = "400px" }: Options) {
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const [visibleCount, setVisibleCount] = useState(() => Math.min(pageSize, total));

	useEffect(() => {
		setVisibleCount(Math.min(pageSize, total));
	}, [total, pageSize]);

	useEffect(() => {
		const node = sentinelRef.current;
		if (!node || visibleCount >= total) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setVisibleCount((prev) => Math.min(prev + pageSize, total));
					}
				}
			},
			{ rootMargin },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [total, pageSize, rootMargin, visibleCount]);

	return {
		sentinelRef,
		visibleCount,
		hasMore: visibleCount < total,
	};
}
