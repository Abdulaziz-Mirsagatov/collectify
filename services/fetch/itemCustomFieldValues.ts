import { ItemCustomFieldValue } from "@/types/env";

export const getItemCustomFieldValuesByItem = async (
  itemId: string
): Promise<ItemCustomFieldValue[]> => {
  const res = await fetch(
    `${process.env.API_URL}/api/itemCustomFieldValues/byItem/${itemId}`
  );

  return res.json();
};
