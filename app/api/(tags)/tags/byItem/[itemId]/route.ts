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

export async function DELETE(
  _: NextRequest,
  { params }: { params: TagsByItemRequestParams }
) {
  const { itemId } = params;
  const deletedTags = await prisma.tag.deleteMany({
    where: {
      itemId,
    },
  });

  return NextResponse.json(deletedTags, { status: 204 });
}
