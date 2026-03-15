import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

import { cn } from "@/lib/utils";
import { getCompatibleRender } from "@/lib/base-ui";

const Popover = PopoverPrimitive.Root;

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & {
	asChild?: boolean;
};

const PopoverTrigger = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Trigger>,
	PopoverTriggerProps
>(({ asChild = false, render, children, ...props }, ref) => {
	const compatibleRender = getCompatibleRender({
		asChild,
		render,
		children,
		componentName: "PopoverTrigger",
	});

	return (
		<PopoverPrimitive.Trigger ref={ref} render={compatibleRender.render} {...props}>
			{compatibleRender.children}
		</PopoverPrimitive.Trigger>
	);
});
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Popup> &
	Pick<
		React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Positioner>,
		"align" | "alignOffset" | "side" | "sideOffset"
	>;

const PopoverAnchor = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
	(props, ref) => <div ref={ref} {...props} />
);
PopoverAnchor.displayName = "PopoverAnchor";

const PopoverContent = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Popup>,
	PopoverContentProps
>(
	(
		{ className, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, ...props },
		ref
	) => (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="z-50"
			>
				<PopoverPrimitive.Popup
					ref={ref}
					className={cn(
						"z-50 w-72 origin-[--transform-origin] rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[starting-style]:animate-in data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[starting-style]:fade-in-0 data-[ending-style]:zoom-out-95 data-[starting-style]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
						className
					)}
					{...props}
				/>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	)
);
PopoverContent.displayName = PopoverPrimitive.Popup.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
