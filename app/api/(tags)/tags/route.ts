import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");

  if (query) {
    const tags = await prisma.tag.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json(tags);
  }

  const tags = await prisma.tag.findMany();

  return NextResponse.json(tags);
}
