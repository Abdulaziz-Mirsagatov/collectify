import { z } from "zod";

const requiredIfGiven = (field: string | null | undefined) => {
  if (field === "") return false;
  return true;
};

export const CollectionSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  fieldName1: z.string().nullish().refine(requiredIfGiven),
  fieldName2: z.string().nullish().refine(requiredIfGiven),
  fieldName3: z.string().nullish().refine(requiredIfGiven),
});

export type CollectionSchemaType = z.infer<typeof CollectionSchema>;
