import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CommentRequestParams, PutCommentRequest } from "./types";
import { pusherServer } from "@/pusher/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: CommentRequestParams }
) {
  const comment = await prisma.comment.findUnique({
    where: {
      id: params.commentId,
    },
  });

  return NextResponse.json(comment);
}

export async function PUT(
  req: PutCommentRequest,
  { params }: { params: CommentRequestParams }
) {
  const comment = await req.json();

  const existingComment = await prisma.comment.findUnique({
    where: {
      id: params.commentId,
    },
  });
  if (!existingComment)
    return NextResponse.json({ message: "Comment not found" }, { status: 404 });

  const updatedComment = await prisma.comment.update({
    where: {
      id: params.commentId,
    },
    data: comment,
  });

  return NextResponse.json(updatedComment);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: CommentRequestParams }
) {
  const existingComment = await prisma.comment.findUnique({
    where: {
      id: params.commentId,
    },
  });
  if (!existingComment)
    return NextResponse.json({ message: "Comment not found" }, { status: 404 });

  const comment = await prisma.comment.delete({
    where: {
      id: params.commentId,
    },
  });

  pusherServer.trigger(`comments-${comment.itemId}`, "delete-comment", comment);

  return NextResponse.json(comment);
}
