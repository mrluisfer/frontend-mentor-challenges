import { useContext } from "react";
import { CommentsContext } from "../context/CommentsContext.js";
import { useGetUser } from "./useGetUser.js";
import type { AsComment, Comment } from "../types/index.types.js";
import { useCommentsStore } from "../store/commentsStore.js";

type UseCommentActions = {
	comment?: Comment;
	as?: AsComment;
};
export const useCommentActions = ({ comment, as = "comment" }: UseCommentActions) => {
	const { comments, setComments } = useContext(CommentsContext);
	const { user } = useGetUser();
	const isAuthor = comment?.user.username === user.username;
	const { addNewComment } = useCommentsStore();

	const handleDeleteComment = () => {
		if (!comment) throw new Error("No comment to delete");
		if (as === "comment") {
			const updatedComments = comments?.filter((c) => c.id !== comment?.id);
			if (updatedComments) {
				setComments?.(updatedComments);
			}
		} else if (as === "replies") {
			const updatedComments = comments?.map((c) => {
				if (c.replies) {
					const updatedReplies = c.replies.filter((r) => r.id !== comment?.id);
					return { ...c, replies: updatedReplies };
				}
				return c;
			});

			if (updatedComments) {
				setComments?.(updatedComments);
			}
		}
	};

	function handleAddComment(value: string) {
		if (!value) return;
		const createdAt = new Date().toDateString();
		const newComment: Comment = {
			id: Date.now(),
			user,
			content: value,
			score: 0,
			replies: [],
			createdAt,
		};
		addNewComment(newComment);
	}

	function handleAddReply(value: string, comment: Comment) {
		if (!value) return;
		if (!comment) throw new Error("No comment to reply to");

		const createdAt = new Date().toDateString();
		const newReply: Comment = {
			id: Date.now(),
			user,
			content: value,
			score: 0,
			replies: [],
			createdAt,
			replyingTo: comment.user.username,
		};
		const updatedComments = comments?.map((c) => {
			const isTargetThread = c.id === comment.id || c.replies?.some((reply) => reply.id === comment.id);

			if (isTargetThread) {
				return { ...c, replies: [newReply, ...(c.replies ?? [])] };
			}
			return c;
		});
		if (updatedComments) {
			setComments?.(updatedComments);
		}
	}

	return {
		handleDeleteComment,
		isAuthor,
		comments,
		handleAddComment,
		handleAddReply,
	};
};
