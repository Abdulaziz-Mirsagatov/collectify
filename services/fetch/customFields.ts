import { CustomField } from "@/types/env";

export const getCustomFieldsByCollection = async (
  collectionId: string
): Promise<CustomField[]> => {
  const res = await fetch(
    `${process.env.API_URL}/api/customFields/byCollection/${collectionId}`
  );

  return res.json();
};
