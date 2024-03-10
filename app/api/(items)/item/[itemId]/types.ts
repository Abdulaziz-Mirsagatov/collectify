import { NextRequest } from "next/server";

export interface ItemRequestParams {
  itemId: string;
}

export interface PutItemRequest extends NextRequest {
  json: () => Promise<{
    name?: string;
    collectionId?: string;
  }>;
}
