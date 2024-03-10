import { NextRequest } from "next/server";

export interface CollectionRequestParams {
  collectionId: string;
}

export interface PutCollectionRequest extends NextRequest {
  json: () => Promise<{
    name?: string;
    description?: string;
    topic?: string;
    image?: string;
    categoryId?: string;
  }>;
}
