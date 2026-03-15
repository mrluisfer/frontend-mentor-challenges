import Comment from '../Comment';
import type { Comment as CommentType } from '../../types/index.types.ts';
import './styles/comments-section.css';

export default function CommentsSection({ comment }: { comment: CommentType }) {
	return (
		<li className="flex w-full list-none flex-col gap-4 md:gap-5">
			<Comment key={comment.id} as="comment" comment={comment} />
			{comment.replies && comment.replies.length > 0 ? (
				<div className="replies flex flex-col gap-4 md:gap-5">
					{comment.replies.map((reply) => <Comment comment={reply} key={reply.id} as="replies" />)}
				</div>
			) : null}
		</li>
	);
}
