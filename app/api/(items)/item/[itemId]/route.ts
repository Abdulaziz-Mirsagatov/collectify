import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ItemRequestParams, PutItemRequest } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: ItemRequestParams }
) {
  const item = await prisma.item.findUnique({
    where: {
      id: params.itemId,
    },
  });
  if (!item)
    return NextResponse.json({ message: "Item not found" }, { status: 404 });

  return NextResponse.json(item);
}

export async function PUT(
  req: PutItemRequest,
  { params }: { params: ItemRequestParams }
) {
  const item = await req.json();

  const existingItem = await prisma.item.findUnique({
    where: {
      id: params.itemId,
    },
  });
  if (!existingItem)
    return NextResponse.json({ message: "Item not found" }, { status: 404 });

  const updatedItem = await prisma.item.update({
    where: {
      id: params.itemId,
    },
    data: item,
  });

  return NextResponse.json(updatedItem);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: ItemRequestParams }
) {
  const existingItem = await prisma.item.findUnique({
    where: {
      id: params.itemId,
    },
  });
  if (!existingItem)
    return NextResponse.json({ message: "Item not found" }, { status: 404 });

  const deletedItem = await prisma.item.delete({
    where: {
      id: params.itemId,
    },
  });

  return NextResponse.json(deletedItem);
}
