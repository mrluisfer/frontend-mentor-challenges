import Container from "./challenge-card/components/Container";

export default function BuildingMoreCard() {
	return (
		<Container className="h-[350px]">
			<div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100 px-6 transition-all duration-500 group-hover:from-yellow-100 group-hover:via-yellow-200 group-hover:to-amber-200 dark:from-yellow-300 dark:via-yellow-400 dark:to-amber-400 dark:group-hover:from-yellow-200 dark:group-hover:via-yellow-300 dark:group-hover:to-amber-300">
				<div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/50 blur-3xl transition-all duration-500 group-hover:scale-125 dark:bg-yellow-100/30" />
				<div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-yellow-200/50 blur-3xl transition-all duration-500 group-hover:scale-125 dark:bg-amber-200/30" />
				<h1 className="relative z-10 bg-gradient-to-br from-amber-800 to-yellow-700 bg-clip-text text-center text-3xl font-bold tracking-tight text-transparent transition-all duration-300 group-hover:scale-105 dark:from-amber-900 dark:to-yellow-800">
					Building more challenges every week!
				</h1>
			</div>
		</Container>
	);
}
