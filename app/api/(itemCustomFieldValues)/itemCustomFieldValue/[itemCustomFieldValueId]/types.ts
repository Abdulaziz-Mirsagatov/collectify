import { NextRequest } from "next/server";

export interface ItemCustomFieldValueRequestParams {
  itemCustomFieldValueId: string;
}

export interface PutItemCustomFieldValueRequest extends NextRequest {
  json: () => Promise<{
    stringValue?: string;
    intValue?: number;
    multilineValue?: string;
    booleanValue?: boolean;
    dateValue?: string;
  }>;
}
