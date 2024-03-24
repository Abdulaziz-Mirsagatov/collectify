import { Comment } from "@/types/env";

export interface CommentsListProps {
  initialComments: Comment[];
  userId: string | undefined;
  itemId: string;
  dict: Record<string, any>;
}
