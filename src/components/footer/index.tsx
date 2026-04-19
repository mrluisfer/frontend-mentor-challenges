import FooterLinks from "./components/Links";

export default function Footer() {
	return (
		<footer
			className="w-full border-t border-neutral-200 bg-neutral-950 py-6 text-white dark:border-neutral-800"
			aria-label="Site footer"
		>
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:gap-0 sm:px-6 lg:px-8">
				<p className="text-sm text-neutral-400">
					Made with{" "}
					<span aria-label="love" role="img">
						💙
					</span>{" "}
					by{" "}
					<a
						href="https://github.com/mrLuisFer"
						target="_blank"
						rel="noopener noreferrer"
						className="font-semibold text-white underline-animated transition-colors hover:text-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
					>
						mrLuisFer
					</a>
				</p>
				<FooterLinks />
			</div>
		</footer>
	);
}
