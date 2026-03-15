import { useCommentActions } from '../../../hooks/useCommentActions';
import { useState } from 'react';
import Header from './Header';
import { useEditingComment } from '../../../hooks/useEditingComment';
import TextContent from './TextContent';
import Likes from '../Likes/index';
import HeaderActions from './Header/HeaderActions';
import type { AsComment, Comment } from '../../../types/index.types';
import DesktopHidden from '@/challenges/interactive-comments/components/DesktopHidden';

export default function Content({ comment, as }: { comment: Comment; as: AsComment }) {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const { isAuthor } = useCommentActions({ comment, as });

	const { handleUpdatedContent } = useEditingComment({
		isAuthor,
		as,
		comment,
		isEditing,
		setIsEditing,
	});

	return (
		<div className="flex min-w-0 flex-1 flex-col gap-4">
			<Header comment={comment} as={as} isEditing={isEditing} setIsEditing={setIsEditing} />
			<TextContent
				isEditing={isEditing}
				comment={comment}
				handleUpdatedContent={handleUpdatedContent}
				setIsEditing={setIsEditing}
			/>
			<DesktopHidden>
				<footer className="mt-1 flex items-center justify-between gap-4">
					<Likes comment={comment} as={as} />
					<HeaderActions
						as={as}
						comment={comment}
						isEditing={isEditing}
						setIsEditing={setIsEditing}
					/>
				</footer>
			</DesktopHidden>
		</div>
	);
}
