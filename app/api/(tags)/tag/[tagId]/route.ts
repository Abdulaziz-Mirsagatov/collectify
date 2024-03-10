import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { PutTagRequest, TagRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: TagRequestParams }
) {
  const tag = await prisma.tag.findUnique({
    where: {
      id: params.tagId,
    },
  });

  return NextResponse.json(tag);
}

export async function PUT(
  req: PutTagRequest,
  { params }: { params: TagRequestParams }
) {
  const tag = await req.json();

  const existingTag = await prisma.tag.findUnique({
    where: {
      id: params.tagId,
    },
  });
  if (!existingTag)
    return NextResponse.json({ message: "Tag not found" }, { status: 404 });

  const updatedTag = await prisma.tag.update({
    where: {
      id: params.tagId,
    },
    data: tag,
  });

  return NextResponse.json(updatedTag);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: TagRequestParams }
) {
  const existingTag = await prisma.tag.findUnique({
    where: {
      id: params.tagId,
    },
  });
  if (!existingTag)
    return NextResponse.json({ message: "Tag not found" }, { status: 404 });

  const tag = await prisma.tag.delete({
    where: {
      id: params.tagId,
    },
  });

  return NextResponse.json(tag);
}
