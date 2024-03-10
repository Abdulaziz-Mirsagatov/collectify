import { PrismaClient } from "@prisma/client";
import { PostTagRequest } from "./types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: PostTagRequest) {
  const tag = await req.json();

  const newTag = await prisma.tag.create({
    data: tag,
  });

  return NextResponse.json(newTag, { status: 201 });
}
