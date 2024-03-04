import { User } from "@/types/env";
import { NextRequest } from "next/server";

export interface PostUserRequest extends NextRequest {
  json: () => Promise<User>;
}
