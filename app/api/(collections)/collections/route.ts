import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search") ?? "";
  const limit = searchParams.get("limit") ?? null;
  const sort = searchParams.get("sort") ?? null;

  const collections = await prisma.collection.findMany({
    where: {
      name: {
        contains: search,
      },
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
