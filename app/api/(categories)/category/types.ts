import { Category } from "@/types/env";
import { NextRequest } from "next/server";

export interface PostCategoryRequest extends NextRequest {
  json: () => Promise<Category>;
}
