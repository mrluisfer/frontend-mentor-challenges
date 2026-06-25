import qrImage from "./images/image-qr-code.png?url";

export default function QrCard() {
	return (
		<main className="font-outfit flex min-h-screen items-center justify-center bg-[#d6e2f0]">
			<div className="w-[315px] rounded-[20px] bg-white p-6 shadow transition-shadow hover:shadow-lg">
				<a href="https://github.com/mrLuisFer" target="_blank" rel="noreferrer noopener">
					<img
						src={qrImage}
						alt="QR Code"
						draggable="false"
						className="w-full rounded-[15px] object-cover"
					/>
				</a>
				<h1 className="mt-8 text-center text-xl text-[var(--qr-dark-blue)]">
					<a
						href="https://www.frontendmentor.io/challenges"
						target="_blank"
						rel="noreferrer noopener"
						className="font-semibold text-inherit hover:text-black"
					>
						Improve your front-end skills by building projects
					</a>
				</h1>
				<p className="mx-auto mt-2.5 w-[250px] text-center text-base leading-6 font-normal text-[var(--qr-grayish-blue)]">
					Scan the QR code to visit Frontend Mentor and take your coding skills to the next level
				</p>
			</div>
		</main>
	);
}
