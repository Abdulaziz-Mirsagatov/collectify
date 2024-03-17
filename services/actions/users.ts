"use server";

import { USER_ROLES } from "@/constants/users";
import { User } from "@/types/env";

export type NewUser = Omit<User, "id" | "role" | "createdAt" | "updatedAt">;

export const addUser = async (user: NewUser) => {
  const res = await fetch(`${process.env.API_URL}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user, role: USER_ROLES.USER }),
  });

  return res.json();
};
