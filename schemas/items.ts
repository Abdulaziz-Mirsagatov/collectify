import { z } from "zod";

export const ItemSchema = z.object({
  name: z.string().min(1),
  customField1: z.any().optional(),
  customField2: z.any().optional(),
  customField3: z.any().optional(),
});

export type ItemSchemaType = z.infer<typeof ItemSchema>;
