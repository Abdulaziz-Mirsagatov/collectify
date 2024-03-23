import { NextRequest } from "next/server";

export interface TagByItemRequestParams {
  itemId: string;
}

export interface PutTagByItemRequest extends NextRequest {
  json(): Promise<{ tag: string }>;
}
