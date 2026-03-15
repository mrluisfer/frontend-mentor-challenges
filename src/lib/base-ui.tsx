import * as React from "react";

type CompatibleRenderOptions<TRender> = {
	asChild?: boolean;
	render?: TRender;
	children?: React.ReactNode;
	componentName: string;
};

export function getCompatibleRender<TRender>({
	asChild = false,
	render,
	children,
	componentName,
}: CompatibleRenderOptions<TRender>) {
	if (render || !asChild) {
		return { render, children };
	}

	const child = React.Children.only(children);

	if (!React.isValidElement(child)) {
		throw new Error(`${componentName} with "asChild" expects a single React element child.`);
	}

	return {
		render: child as TRender,
		children: (child.props as { children?: React.ReactNode }).children,
	};
}
