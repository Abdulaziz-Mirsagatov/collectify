import { Collection } from "@/types/env";

export const getCollections = async (
  search?: string,
  limit?: string,
  sort?: string
): Promise<Collection[]> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (limit) params.append("limit", limit);
  if (sort) params.append("sort", sort);

  const res = await fetch(
    `${process.env.API_URL}/api/collections?${params.toString()}`,
    {
      next: { tags: ["collections"] },
    }
  );

  return res.json();
};

export const getCollectionsByUser = async (
  userId: string,
  search?: string,
  limit?: string,
  sort?: string
): Promise<Collection[]> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (limit) params.append("limit", limit);
  if (sort) params.append("sort", sort);

  const res = await fetch(
    `${
      process.env.API_URL
    }/api/collections/byUser/${userId}?${params.toString()}`,
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
