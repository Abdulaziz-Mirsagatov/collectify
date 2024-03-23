import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { TagsByItemRequestParams } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: TagsByItemRequestParams }
) {
  const tags = await prisma.tag.findMany({
    where: {
      itemId: params.itemId,
    },
  });

  return NextResponse.json(tags);
}

// export async function PUT(
//   req: PutTagsByItemRequest,
//   { params }: { params: TagsByItemRequestParams }
// ) {
//   const { tags } = await req.json();

//   const updateTags = tags.map((tag) => ({
//     itemId: params.itemId,
//     name: tag,
//   }));
//   console.log(updateTags);

//   const updatedTags = await prisma.tag.updateMany({
//     where: {
//       itemId: params.itemId,
//     },
//     data: updateTags,
//   });

//   return NextResponse.json(updatedTags);
// }

export async function DELETE() {
  const deletedTags = await prisma.tag.deleteMany();

  return NextResponse.json(deletedTags, { status: 204 });
}
