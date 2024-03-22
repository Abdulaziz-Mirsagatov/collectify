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
