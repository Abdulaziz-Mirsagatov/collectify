import { NextRequest } from "next/server";

export interface LoginRequest extends NextRequest {
  json(): Promise<{
    username: string;
    password: string;
  }>;
}
