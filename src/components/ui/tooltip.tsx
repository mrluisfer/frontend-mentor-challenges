import * as React from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

import { cn } from "@/lib/utils";
import { getCompatibleRender } from "@/lib/base-ui";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

type TooltipTriggerProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> & {
	asChild?: boolean;
};

const TooltipTrigger = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Trigger>,
	TooltipTriggerProps
>(({ asChild = false, render, children, ...props }, ref) => {
	const compatibleRender = getCompatibleRender({
		asChild,
		render,
		children,
		componentName: "TooltipTrigger",
	});

	return (
		<TooltipPrimitive.Trigger ref={ref} render={compatibleRender.render} {...props}>
			{compatibleRender.children}
		</TooltipPrimitive.Trigger>
	);
});
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Popup>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Popup> &
		Pick<
			React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Positioner>,
			"align" | "alignOffset" | "side" | "sideOffset"
		>
>(
	(
		{ className, side = "top", sideOffset = 4, align = "center", alignOffset = 0, ...props },
		ref
	) => (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="z-50"
			>
				<TooltipPrimitive.Popup
					ref={ref}
					className={cn(
						"z-50 origin-[--transform-origin] overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground data-[starting-style]:animate-in data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[starting-style]:fade-in-0 data-[ending-style]:zoom-out-95 data-[starting-style]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
						className
					)}
					{...props}
				/>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	)
);
TooltipContent.displayName = TooltipPrimitive.Popup.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
