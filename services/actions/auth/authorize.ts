"use server";

import { CredentialsInteface } from "@/app/api/auth/[...nextauth]/types";

export const authorize = async (credentials: CredentialsInteface) => {
  const res = await fetch(`${process.env.API_URL}/api/login`, {
    method: "POST",
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res;
};
