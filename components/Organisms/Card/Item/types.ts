import { Locale } from "@/i18n-config";

export interface ItemCardProps {
  lang: Locale;
  itemId: string;
  collectionId: string;
  hasAccess: boolean | null;
}
