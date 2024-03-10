import { PrismaClient } from "@prisma/client";
import { PostCollectionRequest } from "./types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: PostCollectionRequest) {
  const collection = await req.json();

  const newCollection = await prisma.collection.create({
    data: {
      name: collection.name,
      description: collection.description,
      topic: collection.topic,
      image: collection.image,
      userId: collection.userId,
      categoryId: collection.categoryId,
    },
  });

  return NextResponse.json(newCollection, { status: 201 });
}
