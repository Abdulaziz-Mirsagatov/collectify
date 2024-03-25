import { Locale } from "@/i18n-config";

export interface CollectionsTableContainerProps {
  lang: Locale;
  search?: string;
  limit?: string;
  sort?: "asc" | "desc";
}

export interface CollectionRow {
  id: string;
  name: string;
  category: string;
  author: string;
  image?: string;
}
