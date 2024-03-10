import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { CustomFieldByCollectionRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: CustomFieldByCollectionRequestParams }
) {
  const customFields = await prisma.customField.findMany({
    where: {
      collectionId: params.collectionId,
    },
  });

  return NextResponse.json(customFields);
}
