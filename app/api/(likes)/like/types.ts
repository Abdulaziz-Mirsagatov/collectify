import { Like } from "@/types/env";
import { NextRequest } from "next/server";

export interface PostLikeRequest extends NextRequest {
  json: () => Promise<Like>;
}
