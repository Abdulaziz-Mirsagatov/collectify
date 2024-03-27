import ThemeToggler from "@/components/Atoms/Button/Toggler/Theme";
import LanguageSelectInput from "@/components/Atoms/Input/Select/Language";
import { getDictionary } from "@/app/dictionaries";
import { Suspense } from "react";
import { auth } from "@/auth";
import NavLinksRegular from "@/components/Molecules/Links/Navbar/Regular";
import Image from "next/image";
import userPlaceholderImage from "@/public/images/user_placeholder.png";
import MobileNavbar from "../Mobile";
import { RegularNavbarProps } from "./types";

const RegularNavbar = async ({ lang }: RegularNavbarProps) => {
  const dict = await getDictionary(lang);
  const session = await auth();

  return (
    <nav className="w-full bg-light-gray dark:bg-dark-gray flex pr-16 lg:px-6 p-4 shadow-md h-16">
      <ul className="grow flex gap-4 lg:gap-8 justify-end items-center">
        <Suspense>
          <LanguageSelectInput dict={dict.component.languageSelectInput} />
        </Suspense>
        <ThemeToggler />
        <NavLinksRegular
          session={session}
          dict={dict.component.navbar}
          lang={lang}
        />
        {session && (
          <Image
            width={45}
            height={45}
            src={
              session.user?.image !== "" && session.user?.image
                ? session.user.image
                : userPlaceholderImage
            }
            alt="user placeholder"
            className="hidden lg:block aspect-square rounded-full object-cover"
          />
        )}
        <MobileNavbar
          dict={dict.component.navbar}
          lang={lang}
          session={session}
        />
      </ul>
    </nav>
  );
};

export default RegularNavbar;
