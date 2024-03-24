import { PrismaClient } from "@prisma/client";
import { PostLikeRequest } from "./types";
import { NextResponse } from "next/server";
import { pusherServer } from "@/pusher/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: PostLikeRequest) {
  const like = await req.json();

  const newLike = await prisma.like.create({
    data: like,
  });
  const likes = await prisma.like.findMany({
    where: {
      itemId: like.itemId,
    },
  });

  pusherServer.trigger("like-channel", "like-event", {
    itemId: like.itemId,
    likes: likes.length,
  });

  return NextResponse.json(newLike, { status: 201 });
}
