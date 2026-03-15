import { type MouseEvent, type ReactNode, useContext, useState } from 'react';
import { useGetUser } from '../../hooks/useGetUser.js';
import { useCommentActions } from '../../hooks/useCommentActions.js';
import type { AsComment, Comment } from '../../types/index.types.js';
import { ReplyContext } from '../../context/ReplyContext.js';
import { clsx } from 'clsx';
import DesktopHidden from '@/challenges/interactive-comments/components/DesktopHidden';
import MobileHidden from '@/challenges/interactive-comments/components/MobileHidden';

export default function Reply({ as = 'comment', comment }: { as?: AsComment; comment?: Comment }) {
	const [value, setValue] = useState('');
	const { user } = useGetUser();
	const isReply = as === 'replies';
	const { handleAddComment, handleAddReply } = useCommentActions({
		as,
		comment,
	});
	const { setIsReplying } = useContext(ReplyContext);

	function handleSendReply() {
		const trimmedValue = value.trim();
		if (!trimmedValue) return;
		if (isReply) {
			handleAddReply(trimmedValue, comment!);
			if (setIsReplying) setIsReplying(false);
		} else if (as === 'comment') {
			handleAddComment(trimmedValue);
		}
		setValue('');
	}

	return (
		<div
			className={clsx(
				'flex w-full flex-col gap-4 rounded-[10px] bg-white p-4 shadow-[0_18px_40px_-32px_rgba(71,87,120,0.45)] md:flex-row md:items-start md:gap-4 md:p-6',
			)}
		>
			<MobileHidden>
				<img
					src={user.image.png}
					alt={user.username}
					title={user.username}
					loading="lazy"
					className="h-10 w-10 shrink-0 rounded-full object-cover"
				/>
			</MobileHidden>
			<textarea
				placeholder={isReply ? 'Add a reply...' : 'Add a comment...'}
				rows={4}
				onChange={(e) => setValue(e.target.value)}
				value={value}
				className={clsx(
					'min-h-[96px] w-full flex-1 resize-none rounded-[8px] border border-[hsl(223,19%,93%)] px-4 py-3 text-[16px] leading-6 text-[var(--comments-dark-blue)] outline-none transition-colors duration-200 placeholder:text-[var(--comments-grayish-blue)] focus:border-[var(--comments-moderate-blue)]',
				)}
			/>
			<MobileHidden>
				<ReplyButtonStyled onClick={handleSendReply} disabled={!value.trim()}>
					{isReply ? 'reply' : 'send'}
				</ReplyButtonStyled>
			</MobileHidden>
			<DesktopHidden>
				<footer className="flex items-center justify-between w-full">
					<img
						src={user.image.png}
						alt={user.username}
						title={user.username}
						loading="lazy"
						className="h-10 w-10 shrink-0 rounded-full object-cover"
					/>
					<ReplyButtonStyled onClick={handleSendReply} disabled={!value.trim()}>
						{isReply ? 'reply' : 'send'}
					</ReplyButtonStyled>
				</footer>
			</DesktopHidden>
		</div>
	);
}


function ReplyButtonStyled({ children, disabled = false, onClick }: {
	children: ReactNode,
	disabled?: boolean,
	// eslint-disable-next-line no-unused-vars
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}) {
	return (
		<button
			onClick={onClick}
			type="button"
			disabled={disabled}
			className={clsx(
				'flex min-h-12 w-[104px] items-center justify-center rounded-[8px] border-none px-4 text-center text-[16px] font-medium uppercase text-white transition-opacity duration-200',
				disabled
					? 'cursor-not-allowed bg-[hsl(239,57%,85%)]'
					: 'cursor-pointer bg-[var(--comments-moderate-blue)] hover:opacity-75',
				'reply__button',
			)}
		>
			{children}
		</button>
	);
}
