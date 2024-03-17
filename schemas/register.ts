import { z } from "zod";

const emailValidator = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const passwordValidator = (value: string) => {
  const containsLetter = /[a-zA-Z]/.test(value);
  const containsDigit = /\d/.test(value);
  return containsLetter && containsDigit;
};

const confirmPasswordValidator = (data: {
  password: string;
  confirmPassword: string;
}) => {
  return data.password === data.confirmPassword;
};

export const RegisterSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email().refine(emailValidator),
    username: z.string().min(2),
    password: z
      .string()
      .min(8, { message: "too short" })
      .refine(passwordValidator, { message: "invalid password" }),
    confirmPassword: z.string(),
  })
  .refine(confirmPasswordValidator, { path: ["passwordMismatch"] });

export type RegisterSchemaType = z.infer<typeof RegisterSchema> & {
  passwordMismatch: Record<string, any>;
};
