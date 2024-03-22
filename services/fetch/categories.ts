import { Category } from "@/types/env";

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.API_URL}/api/categories`);
  return response.json();
};

export const getCategory = async (id: string): Promise<Category> => {
  const response = await fetch(`${process.env.API_URL}/api/category/${id}`);
  return response.json();
};
