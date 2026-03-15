import {
	type FormEvent,
	useRef,
	useState,
	type KeyboardEvent,
	type Dispatch,
	type SetStateAction,
} from 'react';
import type { Comment } from '../../../../types/index.types.js';

interface TextContentProps {
	comment: Comment;
	// eslint-disable-next-line no-unused-vars
	handleUpdatedContent: (editedContent: string) => void;
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export default function TextContent({
	comment,
	handleUpdatedContent,
	isEditing,
	setIsEditing,
}: TextContentProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const [editedContent, setEditedContent] = useState<string>(comment.content);
	const hasEditedContent = editedContent.trim().length > 0;

	const handleChangeValue = (editedContent: string) => {
		setEditedContent(editedContent);
	};

	const handleSubmitForm = (event: FormEvent) => {
		event.preventDefault();
	};

	const handleOnKeyEnterDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		const isEnterPressed = event.key === 'Enter' || event.code === 'Enter' || event.keyCode === 13;
		if (isEnterPressed && !event.shiftKey) {
			const textareaValue = textareaRef?.current?.value;
			if (!textareaValue) return;
			handleUpdatedContent(textareaValue);
			textareaRef?.current?.blur();
			setIsEditing(false);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			{isEditing ? (
				<form onSubmit={handleSubmitForm} className="flex flex-col gap-4" ref={formRef}>
					<textarea
						value={editedContent}
						onChange={({ target: { value } }) => handleChangeValue(value)}
						className="min-h-[112px] resize-none rounded-[8px] border border-[hsl(223,19%,93%)] px-4 py-3 text-[15px] leading-6 text-[var(--comments-dark-blue)] outline-none transition-colors duration-200 focus:border-[var(--comments-moderate-blue)]"
						rows={5}
						onKeyDown={handleOnKeyEnterDown}
						ref={textareaRef}
					/>
					<button
						className={hasEditedContent
							? 'ml-auto min-h-12 rounded-[8px] bg-[var(--comments-moderate-blue)] px-7 text-[16px] font-medium uppercase text-white transition-opacity duration-200 hover:opacity-75'
							: 'ml-auto min-h-12 cursor-not-allowed rounded-[8px] bg-[hsl(239,57%,85%)] px-7 text-[16px] font-medium uppercase text-white'}
						onClick={() => handleUpdatedContent(editedContent)}
						type="submit"
						disabled={!hasEditedContent}
					>
						Update
					</button>
				</form>
			) : (
				<p className="text-[16px] leading-[1.6] text-[var(--comments-grayish-blue)]">
					{comment?.replyingTo ? (
						<span className="font-medium text-[var(--comments-moderate-blue)]">
							@{comment?.replyingTo}{' '}
						</span>
					) : null}
					{comment.content}
				</p>
			)}
		</div>
	);
}
