import { User } from "@/types/env";

export const getUsers = async () => {
  const res = await fetch(`${process.env.API_URL}/api/users`);
  return res.json();
};

export const getUser = async (id: string): Promise<User> => {
  const res = await fetch(`${process.env.API_URL}/api/user/${id}`);
  return res.json();
};