import Link from "next/link";
import { NavbarProps } from "./types";

const Navbar = ({ navLinks }: NavbarProps) => {
  return (
    <nav className="w-full bg-light-gray dark:bg-dark-gray flex px-6 p-4">
      <ul className="grow flex gap-12 justify-end items-center">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className="font-bold text-xl hover:bg-info-blue hover:text-light px-4 py-1 -mx-4 -my-1 rounded-md transition-colors"
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
