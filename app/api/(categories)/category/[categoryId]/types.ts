import { NextRequest } from "next/server";

export interface PutCategoryRequest extends NextRequest {
  json: () => Promise<{
    name?: string;
  }>;
}

export interface CategoryRequestParams {
  categoryId: string;
}
