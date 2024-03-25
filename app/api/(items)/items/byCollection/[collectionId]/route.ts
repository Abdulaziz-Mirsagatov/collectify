import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ItemsByCollectionRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: ItemsByCollectionRequestParams }
) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search") ?? "";
  const limit = searchParams.get("limit") ?? null;
  const sort = searchParams.get("sort") ?? null;

  const items = await prisma.item.findMany({
    where: {
      AND: [
        {
          collectionId: params.collectionId,
        },
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    take: limit ? parseInt(limit) : undefined,
    orderBy: sort
      ? {
          name: sort === "asc" ? "asc" : "desc",
        }
      : undefined,
  });

  return NextResponse.json(items);
}
