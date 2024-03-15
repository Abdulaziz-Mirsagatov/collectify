"use server";

import { CredentialsInteface } from "@/app/api/auth/[...nextauth]/types";
import { signIn } from "@/auth";

export const login = async (
  credentials: CredentialsInteface,
  redirectPath: string
) => {
  const res = await signIn("credentials", {
    username: credentials.username,
    password: credentials.password,
    redirectTo: redirectPath,
  });

  return res;
};
