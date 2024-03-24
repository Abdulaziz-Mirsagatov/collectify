import { Comment } from "@/types/env";

export const getItemComments = async (itemId: string): Promise<Comment[]> => {
  const res = await fetch(
    `${process.env.API_URL}/api/comments/byItem/${itemId}`,
    {
      next: { tags: ["comments"] },
    }
  );

  return res.json();
};
