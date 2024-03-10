import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { LikeRequestParams, PutLikeRequest } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: LikeRequestParams }
) {
  const like = await prisma.like.findUnique({
    where: {
      id: params.likeId,
    },
  });
  if (!like)
    return NextResponse.json({ message: "Like not found" }, { status: 404 });

  return NextResponse.json(like);
}

export async function PUT(
  req: PutLikeRequest,
  { params }: { params: LikeRequestParams }
) {
  const like = await req.json();

  const existingLike = await prisma.like.findUnique({
    where: {
      id: params.likeId,
    },
  });
  if (!existingLike)
    return NextResponse.json({ message: "Like not found" }, { status: 404 });

  const updatedLike = await prisma.like.update({
    where: {
      id: params.likeId,
    },
    data: like,
  });

  return NextResponse.json(updatedLike);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: LikeRequestParams }
) {
  const existingLike = await prisma.like.findUnique({
    where: {
      id: params.likeId,
    },
  });
  if (!existingLike)
    return NextResponse.json({ message: "Like not found" }, { status: 404 });

  const like = await prisma.like.delete({
    where: {
      id: params.likeId,
    },
  });

  return NextResponse.json(like);
}
