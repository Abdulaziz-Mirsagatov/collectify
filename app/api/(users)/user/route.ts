import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { PostUserRequest } from "./types";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: PostUserRequest) {
  const { name, email, username, password, image, role } = await req.json();

  if (!username || !password)
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 }
    );

  const existingEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingEmail)
    return NextResponse.json(
      { error: "User with this email already exists" },
      { status: 400 }
    );

  const existingUsername = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (existingUsername)
    return NextResponse.json(
      { error: "User with this username already exists" },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      username,
      password: hashedPassword,
      image,
      role,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
