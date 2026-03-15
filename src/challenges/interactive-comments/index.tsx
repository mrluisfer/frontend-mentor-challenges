import { CommentsProvider } from './context/CommentsContext';
import CommentsSection from './components/CommentsSection';
import Reply from './components/Reply';
import { useCommentsStore } from './store/commentsStore';

function InteractiveComments() {
	const { comments } = useCommentsStore();

	return (
		<CommentsProvider>
			<section className="min-h-[calc(100vh-64px)] bg-[hsl(228,33%,97%)] px-4 py-8 font-[var(--comments-font-family)] md:px-6 md:py-16">
				<div className="mx-auto flex w-full max-w-[730px] flex-col gap-4 md:gap-5">
					<ul className="m-0 flex list-none flex-col gap-4 p-0 md:gap-5">
						{comments?.map((comment) => <CommentsSection comment={comment} key={comment.id} />)}
					</ul>
					<Reply />
				</div>
			</section>
		</CommentsProvider>
	);
}

export default InteractiveComments;
