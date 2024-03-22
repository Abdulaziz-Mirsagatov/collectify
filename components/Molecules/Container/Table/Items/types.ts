import { Locale } from "@/i18n-config";

export interface ItemsTableContainerProps {
  lang: Locale;
  collectionId: string;
}

export interface ItemRow {
  id: string;
  name: string;
  tags: string[];
  [key: string]: any;
}
