"use server";

import { Comment, ErrorResponse } from "@/types/env";
import { revalidateTag } from "next/cache";

export type NewComment = Omit<Comment, "id" | "createdAt" | "updatedAt">;

export const addComment = async (
  comment: NewComment
): Promise<Comment | ErrorResponse> => {
  const res = await fetch(`${process.env.API_URL}/api/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  revalidateTag("comments");
  return res.json();
};

export const deleteComment = async (commentId: string): Promise<void> => {
  await fetch(`${process.env.API_URL}/api/comment/${commentId}`, {
    method: "DELETE",
  });

  revalidateTag("comments");
};

export type UpdatedComment = Partial<Omit<NewComment, "userId" | "itemId">>;

export const updateComment = async (
  commentId: string,
  comment: UpdatedComment
): Promise<Comment | ErrorResponse> => {
  const res = await fetch(`${process.env.API_URL}/api/comment/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  revalidateTag("comments");
  return res.json();
};
