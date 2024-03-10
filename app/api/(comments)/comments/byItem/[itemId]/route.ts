import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CommentByItemRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: CommentByItemRequestParams }
) {
  const comments = await prisma.comment.findMany({
    where: {
      itemId: params.itemId,
    },
  });

  return NextResponse.json(comments);
}
