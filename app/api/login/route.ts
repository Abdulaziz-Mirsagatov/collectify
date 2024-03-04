import { PrismaClient } from "@prisma/client";
import { LoginRequest } from "./types";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: LoginRequest) {
  const { username, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user)
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 400 }
    );

  const valid = await bcrypt.compare(password, user.password as string);
  if (!valid)
    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 400 }
    );

  return NextResponse.json(user);
}
