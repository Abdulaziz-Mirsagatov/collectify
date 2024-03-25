import { Locale } from "@/i18n-config";
import { Session } from "next-auth";

export interface MobileNavbarProps {
  dict: Record<string, any>;
  lang: Locale;
  session: Session | null;
}
