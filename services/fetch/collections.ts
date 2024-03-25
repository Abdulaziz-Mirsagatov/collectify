import { Collection } from "@/types/env";

export const getCollections = async (): Promise<Collection[]> => {
  const res = await fetch(`${process.env.API_URL}/api/collections`, {
    next: { tags: ["collections"] },
  });

  return res.json();
};

export const getCollectionsByUser = async (
  userId: string
): Promise<Collection[]> => {
  const res = await fetch(
    `${process.env.API_URL}/api/collections/byUser/${userId}`,
    {
      next: { tags: ["collections"] },
    }
  );

  return res.json();
};

export const getCollection = async (
  collectionId: string
): Promise<Collection> => {
  const res = await fetch(
    `${process.env.API_URL}/api/collection/${collectionId}`
  );

  return res.json();
};
