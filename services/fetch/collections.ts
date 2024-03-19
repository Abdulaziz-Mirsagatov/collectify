import { Collection } from "@/types/env";

export const getCollections = async (): Promise<Collection[]> => {
  const res = await fetch(`${process.env.API_URL}/api/collections`);

  return res.json();
};
