import { Item } from "@/types/env";

export const getItemsByCollection = async (
  collectionId: string
): Promise<Item[]> => {
  const res = await fetch(
    `${process.env.API_URL}/api/items/byCollection/${collectionId}`,
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
