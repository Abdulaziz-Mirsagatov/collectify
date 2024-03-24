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

export const getCollection = async (
  id: string
): Promise<Collection | ErrorResponse> => {
  const res = await fetch(`${process.env.API_URL}/api/collection/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["collections"] },
  });

  return res.json();
};

export type UpdatedCollection = Partial<Omit<NewCollection, "userId">>;

export const updateCollection = async (
  id: string,
  collection: UpdatedCollection
) => {
  const res = await fetch(`${process.env.API_URL}/api/collection/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...collection }),
  });

  revalidateTag("collections");
  return res.json();
};

export const deleteCollection = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/collection/${id}`, {
    method: "DELETE",
  });

  revalidateTag("collections");
  return res.json();
};
