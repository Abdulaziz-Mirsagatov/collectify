import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  const likes = await prisma.like.findMany();

  return NextResponse.json(likes);
}
