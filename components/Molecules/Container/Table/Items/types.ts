import { Locale } from "@/i18n-config";

export interface ItemsTableContainerProps {
  lang: Locale;
  collectionId: string;
  search?: string;
  limit?: string;
  sort?: string;
}

export interface ItemRow {
  id: string;
  name: string;
  tags: string[];
  [key: string]: any;
}
