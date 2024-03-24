"use server";

import { Like } from "@/types/env";

export type NewLike = Omit<Like, "id" | "createdAt" | "updatedAt">;

export const addLike = async (like: NewLike): Promise<Like> => {
  const res = await fetch(`${process.env.API_URL}/api/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
  });

  return res.json();
};

export const deleteLike = async (id: string): Promise<void> => {
  await fetch(`${process.env.API_URL}/api/like/${id}`, {
    method: "DELETE",
  });
};
