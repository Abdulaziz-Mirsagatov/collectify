"use server";

import { Category, ErrorResponse } from "@/types/env";

export const getCategories = async (): Promise<Category[] | ErrorResponse> => {
  const res = await fetch(`${process.env.API_URL}/api/categories`);
  return res.json();
};

export type NewCategory = Omit<Category, "id">;

export const addCategory = async (category: NewCategory) => {
  const res = await fetch(`${process.env.API_URL}/api/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...category }),
  });

  return res.json();
};
