"use client";

import { USER_ROLES } from "@/constants/users";
import { Locale } from "@/i18n-config";
import { Session } from "next-auth";
import Link from "next/link";
import { NavLink, NavLinksProps } from "./types";
import { logout } from "@/services/actions/auth/logout";
import { useRouter } from "next/navigation";

const getNavLinks = (
  session: Session | null,
  dict: Record<string, any>,
  lang: Locale
) => {
  const navLinks: NavLink[] = [
    {
      label: dict.home,
      href: `/${lang}`,
    },
    {
      label: dict.collections,
      href: `collections`,
    },
  ];

  if (session && session.user?.userId) {
    const personalPageLink: NavLink = {
      label: dict.personalPage,
      href: `/${lang}/collections/${session.user.userId}`,
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
};

const NavLinks = ({ session, dict, lang }: NavLinksProps) => {
  const navLinks: NavLink[] = getNavLinks(session, dict, lang);
  const router = useRouter();

  return (
    <>
      {navLinks.map((link, index) => (
        <li
          key={index}
          className="font-bold text-xl hover:bg-dark-gray hover:text-light-gray dark:hover:bg-light-gray dark:hover:text-dark-gray px-4 py-1 -mx-4 -my-1 rounded-md transition-colors"
        >
          <Link href={link.href} className="py-2 -my-2 px-4 -mx-4">
            {link.label}
          </Link>
        </li>
      ))}
      {session && (
        <li
          className="text-xl button button-info"
          style={{ padding: "0.4rem 1.2rem" }}
          onClick={async () => {
            await logout();
            router.push("login");
          }}
        >
          <button className="py-2 -my-2 px-4 -mx-4">{dict.logout}</button>
        </li>
      )}
      {!session && (
        <li
          className="text-xl button button-info"
          style={{ padding: "0.4rem 1.2rem" }}
        >
          <Link href={"login"} className="py-2 -my-2 px-4 -mx-4">
            {dict.login}
          </Link>
        </li>
      )}
    </>
  );
};

export default NavLinks;
