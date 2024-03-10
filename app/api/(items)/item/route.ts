import { PrismaClient } from "@prisma/client";
import { PostItemRequest } from "./types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: PostItemRequest) {
  const item = await req.json();

  const newItem = await prisma.item.create({
    data: item,
  });

  return NextResponse.json(newItem, { status: 201 });
}
