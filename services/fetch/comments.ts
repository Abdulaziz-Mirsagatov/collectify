import { Comment } from "@/types/env";

export const getItemComments = async (
  itemId: string,
  search?: string,
  limit?: string,
  sort?: "asc" | "desc"
): Promise<Comment[]> => {
  const searchParams = new URLSearchParams();
  if (search) searchParams.set("search", search);
  if (limit) searchParams.set("limit", limit);
  if (sort) searchParams.set("sort", sort);

  const res = await fetch(
    `${
      process.env.API_URL
    }/api/comments/byItem/${itemId}?${searchParams.toString()}`,
    {
      next: { tags: ["comments"] },
    }
  );

  return res.json();
};
