import { Locale } from "@/i18n-config";

export interface CollectionCardProps {
  collectionId: string;
  lang: Locale;
  hasAccess: boolean | null;
}
