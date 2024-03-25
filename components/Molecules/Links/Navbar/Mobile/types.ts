import { Locale } from "@/i18n-config";
import { Session } from "next-auth";

export interface MobileNavLinksProps {
  session: Session | null;
  dict: Record<string, any>;
  lang: Locale;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
