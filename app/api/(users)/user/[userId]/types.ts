import { NextRequest } from "next/server";

export interface PutUserRequest extends NextRequest {
  json(): Promise<{
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    image?: string;
    role?: string;
  }>;
}
