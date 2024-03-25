import { Locale } from "@/i18n-config";

export interface UsersTableContainerProps {
  lang: Locale;
  search?: string;
  limit?: string;
  sort?: string;
}
