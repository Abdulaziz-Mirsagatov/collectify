import { NextRequest } from "next/server";

export interface CustomFieldRequestParams {
  customFieldId: string;
}

export interface PutCustomFieldRequest extends NextRequest {
  json: () => Promise<{
    name?: string;
    type?: string;
    collectionId?: string;
  }>;
}
