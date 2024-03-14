export interface NavbarProps {
  navLinks: NavLink[];
  dictionary: Record<string, any>;
  image?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
