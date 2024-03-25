import { User } from "@/types/env";

export const getUsers = async (
  search?: string,
  limit?: string,
  sort?: string
): Promise<User[]> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (limit) params.append("limit", limit);
  if (sort) params.append("sort", sort);

  const res = await fetch(
    `${process.env.API_URL}/api/users?${params.toString()}`
  );
  return res.json();
};

export const getUser = async (id: string): Promise<User> => {
  const res = await fetch(`${process.env.API_URL}/api/user/${id}`, {
    next: { tags: ["users"] },
  });
  return res.json();
};
