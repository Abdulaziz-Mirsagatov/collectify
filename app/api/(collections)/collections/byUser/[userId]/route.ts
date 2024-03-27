import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CollectionsByUserRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: CollectionsByUserRequestParams }
) {
  const { userId } = params;
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search") ?? "";
  const limit = searchParams.get("limit") ?? null;
  const sort = searchParams.get("sort") ?? null;

  const collections = await prisma.collection.findMany({
    where: {
      AND: [
        {
          userId,
        },
        {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              category: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              items: {
                some: {
                  tags: {
                    some: {
                      name: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  },
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
          items: {
            _count: sort === "asc" ? "asc" : "desc",
          },
        }
      : undefined,
  });

  return NextResponse.json(collections);
}
