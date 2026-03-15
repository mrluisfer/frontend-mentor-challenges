import Likes from './Likes';
import Content from './Content';
import Reply from '../Reply';
import type { AsComment, Comment as CommentType } from '../../types/index.types.ts';
import { useState } from 'react';
import { ReplyContext } from '../../context/ReplyContext';
import MobileHidden from '../MobileHidden';

export default function Comment({ as, comment }: { as: AsComment; comment: CommentType }) {
	const [isReplying, setIsReplying] = useState(false);

	return (
		<ReplyContext.Provider
			value={{
				isReplying,
				setIsReplying,
			}}
		>
			<article className="flex w-full flex-col gap-4 rounded-[10px] bg-white p-4 shadow-[0_18px_40px_-32px_rgba(71,87,120,0.45)] md:flex-row md:gap-6 md:p-6">
				<MobileHidden>
					<Likes comment={comment} as={as} />
				</MobileHidden>
				<Content as={as} comment={comment} />
			</article>

			{isReplying && (
				<div className="replies flex flex-col gap-4 md:gap-5">
					<Reply as="replies" comment={comment} />
				</div>
			)}
		</ReplyContext.Provider>
	);
}
