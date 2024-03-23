import { Locale } from "@/i18n-config";

export interface RegularTableProps<T extends Record<string, any>> {
  columns: string[];
  rows: T[];
  dict: Record<string, any>;
  buttons?: React.ReactNode[];
  lang: Locale;
  hasImage?: boolean;
}
