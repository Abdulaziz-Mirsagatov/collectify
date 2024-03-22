import { Tag } from "@/types/env";

export const getTags = async (): Promise<Tag[]> => {
  const res = await fetch(`${process.env.API_URL}/api/tags`);

  return res.json();
};

export const getTagsByItem = async (itemId: string): Promise<Tag[]> => {
  const res = await fetch(`${process.env.API_URL}/api/tags/byItem/${itemId}`);

  return res.json();
};
