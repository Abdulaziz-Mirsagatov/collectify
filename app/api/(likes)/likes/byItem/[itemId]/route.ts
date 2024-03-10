import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { LikesByItemRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: LikesByItemRequestParams }
) {
  const likes = await prisma.like.findMany({
    where: {
      itemId: params.itemId,
    },
  });

  return NextResponse.json(likes);
}
