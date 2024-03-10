import { CustomField } from "@/types/env";
import { NextRequest } from "next/server";

export interface PostCustomFieldRequest extends NextRequest {
  json: () => Promise<CustomField>;
}
