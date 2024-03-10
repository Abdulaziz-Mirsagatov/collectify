import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CustomFieldRequestParams, PutCustomFieldRequest } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: CustomFieldRequestParams }
) {
  const customField = await prisma.customField.findUnique({
    where: {
      id: params.customFieldId,
    },
  });
  if (!customField)
    return NextResponse.json(
      { message: "CustomField not found" },
      { status: 404 }
    );

  return NextResponse.json(customField);
}

export async function PUT(
  req: PutCustomFieldRequest,
  { params }: { params: CustomFieldRequestParams }
) {
  const customField = await req.json();

  const existingCustomField = await prisma.customField.findUnique({
    where: {
      id: params.customFieldId,
    },
  });
  if (!existingCustomField)
    return NextResponse.json(
      { message: "CustomField not found" },
      { status: 404 }
    );

  const updatedCustomField = await prisma.customField.update({
    where: {
      id: params.customFieldId,
    },
    data: customField,
  });

  return NextResponse.json(updatedCustomField);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: CustomFieldRequestParams }
) {
  const existingCustomField = await prisma.customField.findUnique({
    where: {
      id: params.customFieldId,
    },
  });
  if (!existingCustomField)
    return NextResponse.json(
      { message: "CustomField not found" },
      { status: 404 }
    );

  const deletedCustomField = await prisma.customField.delete({
    where: {
      id: params.customFieldId,
    },
  });

  return NextResponse.json(deletedCustomField);
}
