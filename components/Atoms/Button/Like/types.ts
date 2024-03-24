import { NewLike } from "@/services/actions/likes";
import { Like } from "@/types/env";

export interface LikeButtonProps {
  likes: Like[];
  itemId: string;
  userId: string;
  onLike: (like: NewLike) => Promise<Like>;
  onUnlike: (id: string) => Promise<void>;
}
