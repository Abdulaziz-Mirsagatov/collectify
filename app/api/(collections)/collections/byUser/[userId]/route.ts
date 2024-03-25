import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CollectionsByUserRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: CollectionsByUserRequestParams }
) {
  const { userId } = params;
  const collections = await prisma.collection.findMany({
    where: {
      userId,
    },
  });

  return NextResponse.json(collections);
}
