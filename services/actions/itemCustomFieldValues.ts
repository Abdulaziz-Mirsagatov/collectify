"use server";

import { ErrorResponse, ItemCustomFieldValue } from "@/types/env";
import { revalidateTag } from "next/cache";

export type NewCustomFieldValue = Omit<
  ItemCustomFieldValue,
  "id" | "createdAt" | "updatedAt"
>;

export const addItemCustomFieldValue = async (
  value: NewCustomFieldValue
): Promise<ItemCustomFieldValue | ErrorResponse> => {
  const res = await fetch(`${process.env.API_URL}/api/itemCustomFieldValue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...value }),
  });

  revalidateTag("items");
  return res.json();
};

export const getItemCustomFieldValuesByItem = async (
  itemId: string
): Promise<ItemCustomFieldValue[] | ErrorResponse> => {
  const res = await fetch(
    `${process.env.API_URL}/api/itemCustomFieldValues/byItem/${itemId}`,
    {
      next: { tags: ["itemCustomFieldValues"] },
    }
  );

  return res.json();
};

export type UpdatedCustomFieldValue = Partial<NewCustomFieldValue>;

export const updateItemCustomFieldValue = async (
  id: string,
  value: UpdatedCustomFieldValue
): Promise<ItemCustomFieldValue | ErrorResponse> => {
  const res = await fetch(
    `${process.env.API_URL}/api/itemCustomFieldValue/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...value }),
    }
  );
  console.log(res);

  revalidateTag("items");
  revalidateTag("itemCustomFieldValues");
  return res.json();
};
