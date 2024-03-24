import { User } from "@/types/env";

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${process.env.API_URL}/api/users`);
  return res.json();
};

export const getUser = async (id: string): Promise<User> => {
  const res = await fetch(`${process.env.API_URL}/api/user/${id}`, {
    next: { tags: ["users"] },
  });
  return res.json();
};
