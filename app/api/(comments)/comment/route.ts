import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { PostCommentRequest } from "./types";
import { pusherServer } from "@/pusher/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: PostCommentRequest) {
  const comment = await req.json();

  const newComment = await prisma.comment.create({
    data: comment,
  });

  pusherServer.trigger(
    `comments-${newComment.itemId}`,
    "new-comment",
    newComment
  );

  return NextResponse.json(newComment, { status: 201 });
}
