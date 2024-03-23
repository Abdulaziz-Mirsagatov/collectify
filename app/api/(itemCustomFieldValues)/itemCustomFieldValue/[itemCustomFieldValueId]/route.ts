import { PrismaClient } from "@prisma/client";
import {
  ItemCustomFieldValueRequestParams,
  PutItemCustomFieldValueRequest,
} from "./types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function PUT(
  req: PutItemCustomFieldValueRequest,
  { params }: { params: ItemCustomFieldValueRequestParams }
) {
  const customFieldValue = await req.json();
  console.log("id", params.itemCustomFieldValueId);
  const existingCustomFieldValue = await prisma.itemCustomFieldValue.findUnique(
    {
      where: {
        id: params.itemCustomFieldValueId,
      },
    }
  );
  console.log("existingCustomFieldValue", existingCustomFieldValue);
  if (!existingCustomFieldValue)
    return NextResponse.json(
      { message: "ItemCustomFieldValue not found" },
      { status: 404 }
    );

  const updatedCustomFieldValue = await prisma.itemCustomFieldValue.update({
    where: {
      id: params.itemCustomFieldValueId,
    },
    data: customFieldValue,
  });

  return NextResponse.json(updatedCustomFieldValue);
}
