import { Locale } from "@/i18n-config";

export interface NavbarProps {
  navLinks: NavLink[];
  dictionary: Record<string, any>;
  lang: Locale;
  image?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
