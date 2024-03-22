import { PrismaClient } from "@prisma/client";
import { PostItemCustomFieldValueRequest } from "./types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: PostItemCustomFieldValueRequest) {
  const itemCustomFieldValue = await req.json();

  const newItemCustomFieldValue = await prisma.itemCustomFieldValue.create({
    data: {
      stringValue: itemCustomFieldValue.stringValue,
      intValue: itemCustomFieldValue.intValue,
      booleanValue: itemCustomFieldValue.booleanValue,
      multilineValue: itemCustomFieldValue.multilineValue,
      dateValue: itemCustomFieldValue.dateValue,
      itemId: itemCustomFieldValue.itemId,
      customFieldId: itemCustomFieldValue.customFieldId,
    },
  });

  return NextResponse.json(newItemCustomFieldValue, { status: 201 });
}
