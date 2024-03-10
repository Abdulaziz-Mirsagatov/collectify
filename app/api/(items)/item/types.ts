import { Item } from "@/types/env";
import { NextRequest } from "next/server";

export interface PostItemRequest extends NextRequest {
  json: () => Promise<Item>;
}
