"use client";

import { Comment } from "@/types/env";
import { CommentsListProps } from "./types";
import { useEffect, useState } from "react";
import CommentInput from "../../Input/Comment";
import {
  addComment,
  deleteComment,
  updateComment,
} from "@/services/actions/comments";
import { pusherClient } from "@/pusher/client";

const CommentsList = ({
  initialComments,
  userId,
  itemId,
  dict,
}: CommentsListProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  useEffect(() => {
    const channel = pusherClient.subscribe(`comments-${itemId}`);

    channel.bind("new-comment", (comment: Comment) => {
      if (userId === comment.userId) return;
      setComments((prev) => [...prev, comment]);
    });
    channel.bind("delete-comment", (comment: Comment) => {
      if (userId !== comment.userId) return;
      setComments((prev) => prev.filter((c) => c.id !== comment.id));
    });

    return () => {
      pusherClient.unsubscribe(`comments-${itemId}`);
    };
  }, []);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  return (
    <>
      {comments.map((comment) => (
        <CommentInput
          key={comment.id}
          dict={dict}
          itemId={itemId}
          userId={userId}
          initialComment={comment}
          onComment={addComment}
          onEditComment={updateComment}
          onDeleteComment={deleteComment}
        />
      ))}
      {userId && (
        <CommentInput
          dict={dict}
          itemId={itemId}
          userId={userId}
          onComment={addComment}
          onEditComment={updateComment}
          onDeleteComment={deleteComment}
          isInputMode
        />
      )}
    </>
  );
};

export default CommentsList;
