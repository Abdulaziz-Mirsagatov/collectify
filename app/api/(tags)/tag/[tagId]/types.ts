import { NextRequest } from "next/server";

export interface TagRequestParams {
  tagId: string;
}

export interface PutTagRequest extends NextRequest {
  json: () => Promise<{
    name?: string;
    itemId?: string;
  }>;
}
