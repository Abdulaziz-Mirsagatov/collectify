import { Comment } from "@/types/env";
import { NextRequest } from "next/server";

export interface PostCommentRequest extends NextRequest {
  json: () => Promise<Comment>;
}
