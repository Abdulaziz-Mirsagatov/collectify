import { Collection } from "@/types/env";
import { NextRequest } from "next/server";

export interface PostCollectionRequest extends NextRequest {
  json: () => Promise<Collection>;
}
