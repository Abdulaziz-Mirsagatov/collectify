"use server";

import { Tag } from "@/types/env";
import { revalidateTag } from "next/cache";

export type NewTag = Omit<Tag, "id" | "createdAt" | "updatedAt">;

export const addTag = async (tag: NewTag) => {
  const res = await fetch(`${process.env.API_URL}/api/tag`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...tag }),
  });

  revalidateTag("tags");
  return res.json();
};

export const getTagsByItem = async (itemId: string): Promise<Tag[]> => {
  const res = await fetch(`${process.env.API_URL}/api/tags/byItem/${itemId}`);

  return res.json();
};

export const updateItemTags = async (
  itemId: string,
  tags: string[]
): Promise<void> => {
  // delete all tags
  await fetch(`${process.env.API_URL}/api/tags/byItem/${itemId}`, {
    method: "DELETE",
  });

  // add new tags
  await Promise.allSettled(
    tags.map((tag) =>
      addTag({
        name: tag,
        itemId,
      })
    )
  );

  revalidateTag("tags");
};
