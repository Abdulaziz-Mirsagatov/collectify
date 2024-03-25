import { Locale } from "@/i18n-config";
import { Collection } from "@/types/env";

export interface UserCollectionsTableContainerProps {
  userId: string;
  lang: Locale;
}

export interface UserCollectionRow extends Collection {
  category: string;
}
