import { getNavLinks } from "@/helpers/getNavLinks";
import { NavLink } from "../Regular/types";
import { useRouter } from "next/navigation";
import { MobileNavLinksProps } from "./types";
import Link from "next/link";
import { logout } from "@/services/actions/auth/logout";
import placeholder from "@/public/images/user_placeholder.png";
import Image from "next/image";

const MobileNavLinks = ({
  session,
  dict,
  lang,
  setIsMenuOpen,
}: MobileNavLinksProps) => {
  const navLinks: NavLink[] = getNavLinks(session, dict, lang);
  const router = useRouter();

  return (
    <div className="grid gap-8 justify-items-center">
      <Image
        src={
          session?.user?.image !== "" && session?.user?.image
            ? session.user.image
            : placeholder
        }
        alt="user placeholder"
        width={100}
        height={100}
        className="aspect-square rounded-full object-cover"
      />
      {navLinks.map((link, index) => (
        <li
          key={index}
          className="lg:hidden font-bold text-xl hover:bg-dark-gray hover:text-light-gray dark:hover:bg-light-gray dark:hover:text-dark-gray px-4 py-1 -mx-4 -my-1 rounded-md transition-colors"
        >
          <Link
            href={link.href}
            className="py-2 -my-2 px-4 -mx-4 text-3xl"
            onClick={() => setIsMenuOpen(false)}
          >
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
    </div>
  );
};

export default MobileNavLinks;
