import { NavbarProps } from "./types";
import ThemeToggler from "@/components/Atoms/Button/Toggler/Theme";
import LanguageSelectInput from "@/components/Atoms/Input/Select/Language";
import { getDictionary } from "@/app/dictionaries";
import { Suspense } from "react";
import { auth } from "@/auth";
import NavLinks from "@/components/Molecules/Links/Navbar";
import Image from "next/image";
import userPlaceholderImage from "@/public/images/user_placeholder.png";

const Navbar = async ({ lang }: NavbarProps) => {
  const dict = await getDictionary(lang);
  const session = await auth();

  return (
    <nav className="w-full bg-light-gray dark:bg-dark-gray flex px-6 p-4 shadow-md h-16">
      <ul className="grow flex gap-8 justify-end items-center">
        <Suspense>
          <LanguageSelectInput dict={dict.component.languageSelectInput} />
        </Suspense>
        <ThemeToggler />
        <NavLinks session={session} dict={dict.component.navbar} lang={lang} />
        {session && (
          <Image
            width={45}
            src={session.user?.image ?? userPlaceholderImage}
            alt="user placeholder"
            className="aspect-square rounded-full"
          />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
