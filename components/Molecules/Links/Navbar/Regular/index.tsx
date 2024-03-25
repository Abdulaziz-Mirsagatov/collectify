"use client";

import Link from "next/link";
import { NavLink, RegularNavLinksProps } from "./types";
import { logout } from "@/services/actions/auth/logout";
import { useRouter } from "next/navigation";
import { getNavLinks } from "@/helpers/getNavLinks";

const RegularNavLinks = ({ session, dict, lang }: RegularNavLinksProps) => {
  const navLinks: NavLink[] = getNavLinks(session, dict, lang);
  const router = useRouter();

  return (
    <>
      {navLinks.map((link, index) => (
        <li
          key={index}
          className="hidden lg:block font-bold text-xl  hover:bg-dark-gray hover:text-light-gray dark:hover:bg-light-gray dark:hover:text-dark-gray px-4 py-1 -mx-4 -my-1 rounded-md transition-colors"
        >
          <Link href={link.href} className="py-2 -my-2 px-4 -mx-4">
            {link.label}
          </Link>
        </li>
      ))}
      {session && (
        <li
          className="text-xl button button-info w-24"
          onClick={async () => {
            await logout();
            router.push(`/${lang}/login`);
          }}
        >
          <button className="py-2 -my-2 px-4 -mx-4">{dict.logout}</button>
        </li>
      )}
      {!session && (
        <li>
          <Link
            href={`/${lang}/login`}
            className="button button-info block w-24"
          >
            {dict.login}
          </Link>
        </li>
      )}
    </>
  );
};

export default RegularNavLinks;
