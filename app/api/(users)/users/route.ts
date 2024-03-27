import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get("search") ?? "";
  const limit = searchParams.get("limit") ?? null;
  const sort = searchParams.get("sort") ?? null;

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          username: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          role: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    take: limit ? parseInt(limit) : undefined,
  });

  return NextResponse.json(users);
}
