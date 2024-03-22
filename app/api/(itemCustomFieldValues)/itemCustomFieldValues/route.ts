import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  const itemCustomFieldValues = await prisma.itemCustomFieldValue.findMany();

  return NextResponse.json(itemCustomFieldValues);
}
