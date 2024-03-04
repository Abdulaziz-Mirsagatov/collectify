import { PrismaClient } from "@prisma/client";
import { PostCategoryRequest } from "./types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: PostCategoryRequest) {
  const category = await req.json();

  const newCategory = await prisma.category.create({
    data: {
      name: category.name,
    },
  });

  return NextResponse.json(newCategory, { status: 201 });
}
