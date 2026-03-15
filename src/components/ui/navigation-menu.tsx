import * as React from "react";
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const NavigationMenu = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> &
		Pick<React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Positioner>, "align">
>(({ className, children, align = "start", ...props }, ref) => (
	<NavigationMenuPrimitive.Root
		ref={ref}
		className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
		{...props}
	>
		{children}
		<NavigationMenuPositioner align={align} />
	</NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.List
		ref={ref}
		className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
		{...props}
	/>
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Item ref={ref} className={cn("relative", className)} {...props} />
));
NavigationMenuItem.displayName = NavigationMenuPrimitive.Item.displayName;

const navigationMenuTriggerStyle = cva(
	"group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[open]:bg-accent/50"
);

const NavigationMenuTrigger = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Trigger
		ref={ref}
		className={cn(navigationMenuTriggerStyle(), "group", className)}
		{...props}
	>
		{children}{" "}
		<NavigationMenuPrimitive.Icon
			className="relative top-[1px] ml-1 flex h-3 w-3 items-center justify-center transition duration-300 data-[open]:rotate-180"
			aria-hidden="true"
		>
			<ChevronDown className="h-3 w-3" />
		</NavigationMenuPrimitive.Icon>
	</NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Content
		ref={ref}
		className={cn(
			"left-0 top-0 w-full data-[starting-style]:animate-in data-[ending-style]:animate-out data-[ending-style]:fade-out data-[starting-style]:fade-in md:w-auto",
			className
		)}
		{...props}
	/>
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Link>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Link ref={ref} className={className} {...props} />
));
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

const NavigationMenuViewport = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Viewport
		ref={ref}
		className={cn("h-full w-full", className)}
		{...props}
	/>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Icon>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Icon>
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Icon
		ref={ref}
		className={cn("top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden", className)}
		{...props}
	>
		<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
	</NavigationMenuPrimitive.Icon>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Icon.displayName;

const NavigationMenuPositioner = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Positioner>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Positioner>
>(
	(
		{ className, side = "bottom", sideOffset = 8, align = "start", alignOffset = 0, ...props },
		ref
	) => (
		<NavigationMenuPrimitive.Portal>
			<NavigationMenuPrimitive.Positioner
				ref={ref}
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				className={cn("z-50 flex justify-center", className)}
				{...props}
			>
				<NavigationMenuPrimitive.Popup className="relative mt-1.5 h-[var(--popup-height)] w-full origin-[--transform-origin] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[starting-style]:animate-in data-[ending-style]:animate-out data-[ending-style]:zoom-out-95 data-[starting-style]:zoom-in-90 md:w-[var(--popup-width)]">
					<NavigationMenuViewport />
				</NavigationMenuPrimitive.Popup>
			</NavigationMenuPrimitive.Positioner>
		</NavigationMenuPrimitive.Portal>
	)
);
NavigationMenuPositioner.displayName = NavigationMenuPrimitive.Positioner.displayName;

export {
	navigationMenuTriggerStyle,
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
	NavigationMenuPositioner,
};
