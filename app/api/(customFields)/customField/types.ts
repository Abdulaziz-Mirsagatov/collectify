import { CustomField } from "@/types/env";

export interface PostCustomFieldRequest {
  json: () => Promise<CustomField>;
}
