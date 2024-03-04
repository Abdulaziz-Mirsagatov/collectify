import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CategoryRequestParams, PutCategoryRequest } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: CategoryRequestParams }
) {
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  if (!category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  return NextResponse.json(category, { status: 200 });
}

export async function PUT(
  req: PutCategoryRequest,
  { params }: { params: CategoryRequestParams }
) {
  const { name } = await req.json();

  const category = await prisma.category.update({
    where: {
      id: params.categoryId,
    },
    data: {
      name,
    },
  });

  if (!category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  return NextResponse.json(category, { status: 200 });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: CategoryRequestParams }
) {
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  if (!category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  const deletedCategory = await prisma.category.delete({
    where: {
      id: params.categoryId,
    },
  });

  return NextResponse.json(deletedCategory, { status: 200 });
}
