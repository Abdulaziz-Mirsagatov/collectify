import Link from "next/link";
import { NavbarProps } from "./types";
import ThemeToggler from "@/components/Atoms/Button/Toggler/Theme";
import LanguageSelectInput from "@/components/Atoms/Input/Select/Language";
import { getDictionary } from "@/app/dictionaries";
import { Suspense } from "react";

const Navbar = async ({ navLinks, lang }: NavbarProps) => {
  const dict = await getDictionary(lang);

  return (
    <nav className="w-full bg-light-gray dark:bg-dark-gray flex px-6 p-4 shadow-md h-16">
      <ul className="grow flex gap-12 justify-end items-center">
        <Suspense>
          <LanguageSelectInput dict={dict.component.languageSelectInput} />
        </Suspense>
        <ThemeToggler />
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
      </ul>
    </nav>
  );
};

export default Navbar;
