import { Locale } from "@/i18n-config";

export interface CommentsContainerProps {
  lang: Locale;
  itemId: string;
  search?: string;
  limit?: string;
  sort?: "asc" | "desc";
}
