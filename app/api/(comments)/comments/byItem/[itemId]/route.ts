import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CommentByItemRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: CommentByItemRequestParams }
) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search") ?? "";
  const limit = searchParams.get("limit") ?? null;
  const sort = searchParams.get("sort") ?? null;

  const comments = await prisma.comment.findMany({
    where: {
      AND: [
        {
          itemId: params.itemId,
        },
        {
          OR: [
            {
              content: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              user: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
      ],
    },
    take: limit ? parseInt(limit) : undefined,
    orderBy: sort
      ? {
          createdAt: sort === "asc" ? "asc" : "desc",
        }
      : undefined,
  });

  return NextResponse.json(comments);
}
