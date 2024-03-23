import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { PutTagByItemRequest, TagByItemRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function PUT(
  req: PutTagByItemRequest,
  { params }: { params: TagByItemRequestParams }
) {
  const { tag } = await req.json();
  const { itemId } = params;

  const existingTag = await prisma.tag.findFirst({
    where: {
      itemId,
      name: tag,
    },
  });
  if (existingTag) {
    await prisma.tag.delete({
      where: {
        id: existingTag.id,
      },
    });
  }

  const newTag = await prisma.tag.create({
    data: {
      name: tag,
      itemId: itemId,
    },
  });

  return NextResponse.json(newTag);
}
