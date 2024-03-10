import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { TagsByItemRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: TagsByItemRequestParams }
) {
  const tags = await prisma.tag.findMany({
    where: {
      itemId: params.itemId,
    },
  });

  return NextResponse.json(tags);
}
