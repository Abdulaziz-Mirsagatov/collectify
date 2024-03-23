"use server";

import { ErrorResponse, Item } from "@/types/env";
import { revalidateTag } from "next/cache";

export type NewItem = Omit<Item, "id" | "createdAt" | "updatedAt">;

export const getItem = async (id: string): Promise<Item | ErrorResponse> => {
  const res = await fetch(`${process.env.API_URL}/api/item/${id}`);
  return res.json();
};

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

export const deleteItem = async (id: string): Promise<void> => {
  await fetch(`${process.env.API_URL}/api/item/${id}`, {
    method: "DELETE",
  });

  revalidateTag("items");
};

export type UpdatedItem = Partial<NewItem>;

export const updateItem = async (
  id: string,
  item: UpdatedItem
): Promise<Item | ErrorResponse> => {
  const res = await fetch(`${process.env.API_URL}/api/item/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...item }),
  });

  revalidateTag("items");
  return res.json();
};
