import { type MouseEventHandler, type ReactNode, useState } from "react";
import { useCommentActions } from "../../../hooks/useCommentActions.js";
import iconPlus from "../images/icon-plus.svg?url";
import iconMinus from "../images/icon-minus.svg?url";
import type { AsComment, Comment } from "../../../types/index.types.js";
import { clsx } from "clsx";

export default function Likes({ comment, as }: { comment: Comment; as: AsComment }) {
	const [likes, setLikes] = useState(comment.score);
	const [isPlusVoted, setIsPlusVoted] = useState(false);
	const [isMinusVoted, setIsMinusVoted] = useState(false);
	const { isAuthor } = useCommentActions({ comment, as });
	const imgSize = 13;

	function handlePlusVote() {
		if (isAuthor) return;
		if (isPlusVoted) {
			setIsPlusVoted(false);
			setLikes(comment.score);
			return;
		}
		setIsPlusVoted(true);
		setIsMinusVoted(false);
		setLikes(comment.score + 1);
	}

	function handleMinusVote() {
		if (isAuthor) return;
		if (isMinusVoted) {
			setIsMinusVoted(false);
			setLikes(comment.score);
			return;
		}
		setIsMinusVoted(true);
		setIsPlusVoted(false);
		setLikes(comment.score - 1);
	}

	return (
		<div className="flex h-10 w-[100px] shrink-0 flex-row items-center justify-between rounded-[10px] bg-[hsl(228,33%,97%)] px-3 select-none md:h-[100px] md:w-10 md:flex-col md:px-0 md:py-3">
			<LikesButtonStyled onClick={handlePlusVote} isPressed={isPlusVoted} tone="up">
				<img src={iconPlus} alt="icon-plus" width={imgSize} height={imgSize} />
			</LikesButtonStyled>
			<span
				className={clsx(
					"text-[15px] leading-none font-medium transition-colors",
					isMinusVoted ? "text-[var(--comments-soft-red)]" : "text-[var(--comments-moderate-blue)]"
				)}
			>
				{likes}
			</span>
			<LikesButtonStyled onClick={handleMinusVote} isPressed={isMinusVoted} tone="down">
				<img src={iconMinus} alt="icon-minus" width={imgSize} height={imgSize} />
			</LikesButtonStyled>
		</div>
	);
}

function LikesButtonStyled({
	isPressed,
	tone,
	children,
	onClick,
}: {
	isPressed: boolean;
	tone: "up" | "down";
	children: ReactNode;
	onClick: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<button
			onClick={onClick}
			type="button"
			aria-pressed={isPressed}
			className={clsx(
				"flex h-6 w-6 items-center justify-center rounded-full border-none p-0 transition-colors duration-200 hover:opacity-70",
				isPressed
					? tone === "up"
						? "bg-[var(--comments-light-grayish-blue)]"
						: "bg-[var(--comments-pale-red)]"
					: "bg-transparent"
			)}
		>
			{children}
		</button>
	);
}
