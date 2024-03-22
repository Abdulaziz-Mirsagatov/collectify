import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ItemCustomFieldValuesByCustomFieldRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: ItemCustomFieldValuesByCustomFieldRequestParams }
) {
  const itemCustomFieldValues = await prisma.itemCustomFieldValue.findMany({
    where: {
      customFieldId: params.customFieldId,
    },
  });

  return NextResponse.json(itemCustomFieldValues);
}
