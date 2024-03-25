import { Locale } from "@/i18n-config";
import { Session } from "next-auth";

export interface RegularNavLinksProps {
  session: Session | null;
  dict: Record<string, any>;
  lang: Locale;
}

export interface NavLink {
  label: string;
  href: string;
}
