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
