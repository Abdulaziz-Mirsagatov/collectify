import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ItemCustomFieldValueByItemRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: ItemCustomFieldValueByItemRequestParams }
) {
  const itemCustomFieldValues = await prisma.itemCustomFieldValue.findMany({
    where: {
      itemId: params.itemId,
    },
  });

  return NextResponse.json(itemCustomFieldValues);
}
