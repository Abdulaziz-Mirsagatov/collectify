import { Locale } from "@/i18n-config";

export interface RegularTableRowProps<T extends Record<string, any>> {
  row: T;
  columns: string[];
  count: number;
  dict: Record<string, any>;
  button?: React.ReactNode;
  lang: Locale;
  hasImage?: boolean;
}
