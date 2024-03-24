"use server";

import { auth, signOut } from "@/auth";
import { USER_ROLES } from "@/constants/users";
import { User } from "@/types/env";
import { revalidateTag } from "next/cache";

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

export const deleteUser = async (id: string): Promise<void> => {
  const session = await auth();

  await fetch(`${process.env.API_URL}/api/user/${id}`, {
    method: "DELETE",
  });

  if (id === session?.user?.userId) await signOut();

  revalidateTag("users");
};

export type UpdatedUser = Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;

export const updateUser = async (id: string, user: UpdatedUser) => {
  const session = await auth();

  const res = await fetch(`${process.env.API_URL}/api/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (id === session?.user?.userId && user.role) await signOut();

  revalidateTag("users");
  return res.json();
};
