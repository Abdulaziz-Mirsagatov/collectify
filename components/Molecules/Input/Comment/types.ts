import { NewComment, UpdatedComment } from "@/services/actions/comments";
import { Comment, ErrorResponse, User } from "@/types/env";

export interface CommentInputProps {
  dict: Record<string, any>;
  itemId: string;
  user?: User;
  userId?: string;
  isInputMode?: boolean;
  initialComment?: Comment;
  onComment: (comment: NewComment) => Promise<Comment | ErrorResponse>;
  onEditComment: (
    commentId: string,
    comment: UpdatedComment
  ) => Promise<Comment | ErrorResponse>;
  onDeleteComment: (id: string) => Promise<void>;
}
