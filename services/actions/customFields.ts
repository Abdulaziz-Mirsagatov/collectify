"use server";

import { CustomField, ErrorResponse } from "@/types/env";

export type NewCustomField = Omit<
  CustomField,
  "id" | "createdAt" | "updatedAt"
>;

export const addCustomField = async (customField: NewCustomField) => {
  const res = await fetch(`${process.env.API_URL}/api/customField`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...customField }),
  });

  return res.json();
};

export const getCustomFieldsByCollection = async (
  collectionId: string
): Promise<CustomField[]> => {
  const res = await fetch(
    `${process.env.API_URL}/api/customFields/byCollection/${collectionId}`
  );

  return res.json();
};
