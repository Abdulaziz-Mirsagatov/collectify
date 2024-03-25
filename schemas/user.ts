import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(2),
  username: z.string().min(2),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
