import FooterLinks from "./components/Links";

export default function Footer() {
	return (
		<div className="absolute bottom-0 left-0 h-28 w-full bg-neutral-900 py-4 text-white">
			<div className="mx-auto flex max-w-5xl flex-col justify-between gap-4 px-8 py-4 sm:flex-row sm:items-center sm:gap-0">
				<div className="animate-pulse">Made with &#128153; by mrLuisFer</div>
				<FooterLinks />
			</div>
		</div>
	);
}
