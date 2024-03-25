import { NavLink } from "@/components/Molecules/Links/Navbar/Regular/types";
import { USER_ROLES } from "@/constants/users";
import { Locale } from "@/i18n-config";
import { Session } from "next-auth";

export function getNavLinks(
  session: Session | null,
  dict: Record<string, any>,
  lang: Locale
) {
  const navLinks: NavLink[] = [
    {
      label: dict.home,
      href: `/${lang}`,
    },
    {
      label: dict.collections,
      href: `/${lang}/collections`,
    },
  ];

  if (session && session.user?.userId) {
    const personalPageLink: NavLink = {
      label: dict.personalPage,
      href: `/${lang}/personal/${session.user.userId}`,
    };
    navLinks.push(personalPageLink);
    if (session.user.role === USER_ROLES.ADMIN) {
      const usersPageLink: NavLink = {
        label: dict.users,
        href: `/${lang}/admin/users`,
      };
      navLinks.push(usersPageLink);
    }
  }

  return navLinks;
}
