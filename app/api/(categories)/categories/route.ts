import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  const categories = await prisma.category.findMany();

  return NextResponse.json(categories, { status: 200 });
}
