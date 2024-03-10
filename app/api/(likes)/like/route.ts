import { PrismaClient } from "@prisma/client";
import { PostLikeRequest } from "./types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: PostLikeRequest) {
  const like = await req.json();

  const newLike = await prisma.like.create({
    data: like,
  });

  return NextResponse.json(newLike, { status: 201 });
}
