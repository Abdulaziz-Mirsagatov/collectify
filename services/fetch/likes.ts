import { Like } from "@/types/env";

export const getItemLikes = async (itemId: string): Promise<Like[]> => {
  const res = await fetch(`${process.env.API_URL}/api/likes/byItem/${itemId}`, {
    next: { tags: ["likes"] },
  });

  return res.json();
};
