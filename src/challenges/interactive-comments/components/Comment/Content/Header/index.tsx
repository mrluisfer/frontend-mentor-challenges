import { useCommentActions } from '../../../../hooks/useCommentActions';
import HeaderActions from './HeaderActions/index';
import { type AsComment, type Comment } from '../../../../types/index.types';
import MobileHidden from '@/challenges/interactive-comments/components/MobileHidden';

export default function Header({
	comment,
	as,
	setIsEditing,
	isEditing,
}: {
	comment: Comment;
	as: AsComment;
	// eslint-disable-next-line no-unused-vars
	setIsEditing: (value: boolean) => void;
	isEditing: boolean;
}) {
	const username = comment.user.username;
	const { isAuthor } = useCommentActions({ comment, as });

	return (
		<header className="flex items-start justify-between gap-4">
			<div className="flex min-w-0 items-center gap-4">
				<img
					className="h-8 w-8 shrink-0 rounded-full object-cover"
					src={comment.user.image.png}
					alt={username}
					loading="lazy"
				/>
				<div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
					<h2 className="text-[16px] font-medium text-[var(--comments-dark-blue)]">
						{username}
					</h2>
					{isAuthor ? (
						<span className="rounded-[3px] bg-[var(--comments-moderate-blue)] px-1.5 py-0.5 text-[13px] font-medium leading-none text-white">
							you
						</span>
					) : null}
					<p className="text-[15px] font-normal text-[var(--comments-grayish-blue)]">
						{comment.createdAt}
					</p>
				</div>
			</div>
			<MobileHidden>
				<HeaderActions
					as={as}
					comment={comment}
					setIsEditing={setIsEditing}
					isEditing={isEditing}
				/>
			</MobileHidden>
		</header>
	);
}
