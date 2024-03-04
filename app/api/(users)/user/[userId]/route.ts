import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { PutUserRequest } from "./types";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
  });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(
  req: PutUserRequest,
  { params }: { params: { userId: string } }
) {
  const { name, email, username, password, image, role } = await req.json();

  if (email) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser)
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
  }
  if (username) {
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUser)
      return NextResponse.json(
        { error: "User with this username already exists" },
        { status: 400 }
      );
  }

  const user = await prisma.user.update({
    where: { id: params.userId },
    data: {
      name,
      email,
      username,
      password,
      image,
      role,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { userId: string } }
) {
  const user = await prisma.user.delete({
    where: { id: params.userId },
  });

  return NextResponse.json(user);
}
