import { Comment, User } from "@/types/env";

export interface CommentsListProps {
  initialComments: Comment[];
  users: User[];
  userId: string | undefined;
  itemId: string;
  dict: Record<string, any>;
}
