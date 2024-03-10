import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CollectionsByCategoryRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: CollectionsByCategoryRequestParams }
) {
  const collections = await prisma.collection.findMany({
    where: {
      categoryId: params.categoryId,
    },
  });

  return NextResponse.json(collections);
}
