import { type MouseEventHandler, type ReactNode, useState } from 'react';
import { useCommentActions } from '../../../hooks/useCommentActions.js';
import iconPlus from '../images/icon-plus.svg?url';
import iconMinus from '../images/icon-minus.svg?url';
import type { AsComment, Comment } from '../../../types/index.types.js';
import { clsx } from 'clsx';

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
		<div className="flex h-10 w-[100px] shrink-0 select-none flex-row items-center justify-between rounded-[10px] bg-[hsl(228,33%,97%)] px-3 md:h-[100px] md:w-10 md:flex-col md:px-0 md:py-3">
			<LikesButtonStyled onClick={handlePlusVote} isPressed={isPlusVoted}>
				<img src={iconPlus} alt="icon-plus" width={imgSize} height={imgSize} />
			</LikesButtonStyled>
			<span
				className={clsx(
					'text-[15px] font-medium leading-none text-[var(--comments-moderate-blue)]',
					isPlusVoted || isMinusVoted ? 'opacity-90' : '',
				)}
			>
				{likes}
			</span>
			<LikesButtonStyled onClick={handleMinusVote} isPressed={isMinusVoted}>
				<img src={iconMinus} alt="icon-minus" width={imgSize} height={imgSize} />
			</LikesButtonStyled>
		</div>
	);
}

function LikesButtonStyled({ isPressed, children, onClick }: {
	isPressed: boolean,
	children: ReactNode,
	onClick: MouseEventHandler<HTMLButtonElement>
}) {
	return (
		<button
			onClick={onClick}
			type="button"
			className={clsx(
				'flex h-5 w-5 items-center justify-center border-none bg-transparent p-0 transition-opacity duration-200',
				isPressed ? 'opacity-70' : '',
				'hover:opacity-70',
			)}
		>
			{children}
		</button>
	);
}
