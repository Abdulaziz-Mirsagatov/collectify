"use server";

import { ErrorResponse, Item } from "@/types/env";
import { revalidateTag } from "next/cache";

export type NewItem = Omit<Item, "id" | "createdAt" | "updatedAt">;

export const addItem = async (item: NewItem): Promise<Item | ErrorResponse> => {
  const res = await fetch(`${process.env.API_URL}/api/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...item }),
  });

  revalidateTag("items");
  return res.json();
};
