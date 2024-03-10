import { NextRequest } from "next/server";

export interface CommentRequestParams {
  commentId: string;
}

export interface PutCommentRequest extends NextRequest {
  json: () => Promise<{
    content?: string;
    userId?: string;
    itemId?: string;
  }>;
}
