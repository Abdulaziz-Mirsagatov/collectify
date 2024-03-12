import Link from "next/link";
import { NavbarProps } from "./types";
import ThemeToggler from "@/components/Atoms/Button/Toggler/Theme";

const Navbar = ({ navLinks }: NavbarProps) => {
  return (
    <nav className="w-full bg-light-gray dark:bg-dark-gray flex px-6 p-4">
      <ul className="grow flex gap-12 justify-end items-center">
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
