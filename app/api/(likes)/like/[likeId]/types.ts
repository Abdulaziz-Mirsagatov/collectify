import { NextRequest } from "next/server";

export interface LikeRequestParams {
  likeId: string;
}

export interface PutLikeRequest extends NextRequest {
  json: () => Promise<{
    userId?: string;
    itemId?: string;
  }>;
}
