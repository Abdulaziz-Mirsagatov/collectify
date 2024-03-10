import { Collection } from "@/types/env";

export interface PostCollectionRequest {
  json: () => Promise<Collection>;
}
