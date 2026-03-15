import iconReply from '../../../images/icon-reply.svg?url';
import iconDelete from '../../../images/icon-delete.svg?url';
import iconEdit from '../../../images/icon-edit.svg?url';
import { useCommentActions } from '../../../../../hooks/useCommentActions';
import { type AsComment, type Comment } from '../../../../../types/index.types';
import { type MouseEventHandler, type ReactNode, useContext, useState } from 'react';
import { useEditingComment } from '@/challenges/interactive-comments/hooks/useEditingComment';
import { ReplyContext } from '@/challenges/interactive-comments/context/ReplyContext';
import { clsx } from 'clsx';

export default function HeaderActions({
	as,
	comment,
	setIsEditing,
	isEditing,
}: {
	as: AsComment;
	comment: Comment;
	// eslint-disable-next-line no-unused-vars
	setIsEditing: (value: boolean) => void;
	isEditing: boolean;
}) {
	const { handleDeleteComment, isAuthor } = useCommentActions({ comment, as });
	const { onToggleEditContent } = useEditingComment({
		comment,
		isAuthor,
		as,
		setIsEditing,
		isEditing,
	});
	const { setIsReplying } = useContext(ReplyContext);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	return (
		<>
			{isAuthor ? (
				<div className="flex items-center gap-4">
					<CommentHeaderActionsButtonStyled
						onClick={() => setIsDeleteDialogOpen(true)}
						variant="delete"
					>
						<img src={iconDelete} alt="delete" loading="lazy" />
						Delete
					</CommentHeaderActionsButtonStyled>
					<CommentHeaderActionsButtonStyled
						onClick={() => onToggleEditContent(true)}
						variant="edit"
					>
						<img src={iconEdit} alt="edit" loading="lazy" />
						Edit
					</CommentHeaderActionsButtonStyled>
				</div>
			) : (
				<CommentHeaderActionsButtonStyled
					onClick={() => {
						if (setIsReplying) setIsReplying((prevState) => !prevState);
					}}
					variant="reply"
				>
					<img src={iconReply} alt="icon-reply" loading="lazy" />
					Reply
				</CommentHeaderActionsButtonStyled>
			)}

			{isDeleteDialogOpen ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.45)] p-4">
					<div className="flex w-full max-w-[400px] flex-col gap-5 rounded-[10px] bg-white p-6 shadow-[0_24px_60px_-24px_rgba(71,87,120,0.45)]">
						<div className="space-y-4">
							<h3 className="text-[26px] font-medium leading-none text-[var(--comments-dark-blue)]">
								Delete comment
							</h3>
							<p className="text-[16px] leading-6 text-[var(--comments-grayish-blue)]">
								Are you sure you want to delete this comment? This will remove the comment and
								can&apos;t be undone.
							</p>
						</div>
						<div className="grid grid-cols-2 gap-3">
							<DialogButton
								onClick={() => setIsDeleteDialogOpen(false)}
								className="bg-[hsl(211,10%,45%)] hover:bg-[hsl(211,10%,39%)]"
							>
								No, Cancel
							</DialogButton>
							<DialogButton
								onClick={() => {
									handleDeleteComment();
									setIsDeleteDialogOpen(false);
								}}
								className="bg-[var(--comments-soft-red)] hover:bg-[hsl(358,79%,61%)]"
							>
								Yes, Delete
							</DialogButton>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}

function CommentHeaderActionsButtonStyled({
	children,
	variant,
	onClick,
}: {
	children: ReactNode;
	variant: 'delete' | 'edit' | 'reply';
	onClick: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<button
			onClick={onClick}
			type="button"
			className={clsx(
				'flex items-center gap-2 bg-transparent p-0 text-[15px] font-medium transition-opacity duration-200',
				variant === 'delete' ? 'text-[var(--comments-soft-red)]' : 'text-[var(--comments-moderate-blue)]',
				'hover:opacity-60',
			)}
		>
			{children}
		</button>
	);
}

function DialogButton({
	children,
	className,
	onClick,
}: {
	children: ReactNode;
	className: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={clsx(
				'min-h-12 rounded-[8px] px-4 text-[16px] font-medium uppercase tracking-[0.02em] text-white transition-colors duration-200',
				className,
			)}
		>
			{children}
		</button>
	);
}
