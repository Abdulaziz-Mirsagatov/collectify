import { z } from "zod";

export const ItemSchema = z.object({
  name: z.string().min(1),
});

export type ItemSchemaType = z.infer<typeof ItemSchema>;
