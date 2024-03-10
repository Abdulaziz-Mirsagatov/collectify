import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { PostCommentRequest } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: PostCommentRequest) {
  const comment = await req.json();

  const newComment = await prisma.comment.create({
    data: comment,
  });

  return NextResponse.json(newComment, { status: 201 });
}
