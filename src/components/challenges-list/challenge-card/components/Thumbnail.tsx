import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";

type ThumbnailProps = {
	src: string;
	title: string;
};

export default function ChallengeCardThumbnail({ src, title }: ThumbnailProps) {
	const [imgRatio, setImgRatio] = useState(1);

	useEffect(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => {
			setImgRatio(img.width / img.height); // Calculates and sets the aspect ratio (width/height)
		};
	}, [src]);

	return (
		<div className="w-full p-2">
			<AspectRatio ratio={imgRatio}>
				<img
					src={src}
					alt={title}
					className="w-full rounded-md object-cover motion-reduce:hidden"
					loading="lazy"
					draggable="false"
				/>
			</AspectRatio>
		</div>
	);
}
