export interface NavbarProps {
  navLinks: NavLink[];
  image?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
