import { PrismaClient } from "@prisma/client";
import { PostCustomFieldRequest } from "./types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: PostCustomFieldRequest) {
  const customField = await req.json();

  const newCustomField = await prisma.customField.create({
    data: customField,
  });

  return NextResponse.json(newCustomField, { status: 201 });
}
