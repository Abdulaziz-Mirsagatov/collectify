import { Tag } from "@/types/env";
import { NextRequest } from "next/server";

export interface PostTagRequest extends NextRequest {
  json: () => Promise<Tag>;
}
