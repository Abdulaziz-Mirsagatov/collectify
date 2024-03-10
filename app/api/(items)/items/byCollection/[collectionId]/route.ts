import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ItemsByCollectionRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: ItemsByCollectionRequestParams }
) {
  const items = await prisma.item.findMany({
    where: {
      collectionId: params.collectionId,
    },
  });

  return NextResponse.json(items);
}
