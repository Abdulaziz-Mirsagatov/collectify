import { ItemCustomFieldValue } from "@/types/env";
import { NextRequest } from "next/server";

export interface PostItemCustomFieldValueRequest extends NextRequest {
  json: () => Promise<ItemCustomFieldValue>;
}
