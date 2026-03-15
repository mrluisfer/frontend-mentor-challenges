import * as React from "react";
import { cn } from "@/lib/utils";

const AspectRatio = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<"div"> & {
		ratio: number;
	}
>(({ ratio, className, style, ...props }, ref) => (
	<div
		ref={ref}
		style={{ "--ratio": ratio, ...style } as React.CSSProperties}
		className={cn("relative aspect-[var(--ratio)]", className)}
		{...props}
	/>
));
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
