import { Item } from "@/types/env";

export const getItemsByCollection = async (
  collectionId: string,
  search?: string,
  limit?: string,
  sort?: string
): Promise<Item[]> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (limit) params.append("limit", limit);
  if (sort) params.append("sort", sort);

  const res = await fetch(
    `${
      process.env.API_URL
    }/api/items/byCollection/${collectionId}?${params.toString()}`,
    {
      next: { tags: ["items"] },
    }
  );

  return res.json();
};

export const getItem = async (itemId: string): Promise<Item> => {
  const res = await fetch(`${process.env.API_URL}/api/item/${itemId}`, {
    next: { tags: ["items"] },
  });

  return res.json();
};
