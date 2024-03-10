import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CollectionRequestParams, PutCollectionRequest } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: CollectionRequestParams }
) {
  const collection = await prisma.collection.findUnique({
    where: {
      id: params.collectionId,
    },
  });

  return NextResponse.json(collection, { status: 200 });
}

export async function PUT(
  req: PutCollectionRequest,
  { params }: { params: CollectionRequestParams }
) {
  const collection = await req.json();

  const collectionExists = await prisma.collection.findUnique({
    where: {
      id: params.collectionId,
    },
  });
  if (!collectionExists)
    return NextResponse.json(
      { message: "Collection not found" },
      { status: 404 }
    );

  const updatedCollection = await prisma.collection.update({
    where: {
      id: params.collectionId,
    },
    data: {
      name: collection.name,
      description: collection.description,
      topic: collection.topic,
      image: collection.image,
      categoryId: collection.categoryId,
    },
  });

  return NextResponse.json(updatedCollection, { status: 200 });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: CollectionRequestParams }
) {
  const collectionExists = await prisma.collection.findUnique({
    where: {
      id: params.collectionId,
    },
  });
  if (!collectionExists)
    return NextResponse.json(
      { message: "Collection not found" },
      { status: 404 }
    );

  const deletedCollection = await prisma.collection.delete({
    where: {
      id: params.collectionId,
    },
  });

  return NextResponse.json(deletedCollection, { status: 200 });
}
