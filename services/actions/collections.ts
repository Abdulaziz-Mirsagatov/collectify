"use server";

import { auth } from "@/auth";
import { Collection, ErrorResponse } from "@/types/env";
import { revalidateTag } from "next/cache";

// exclude id, createdAt, updatedAt
export type NewCollection = {
  name: string;
  description?: string;
  image?: string;
  userId?: string;
  categoryId: string;
};

export const addCollection = async (
  collection: NewCollection
): Promise<Collection | ErrorResponse> => {
  const session = await auth();
  const res = await fetch(`${process.env.API_URL}/api/collection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...collection,
      userId: collection.userId ?? session?.user?.userId,
    }),
  });

  revalidateTag("collections");
  return res.json();
};
