"use client";

import HamburgerButton from "@/components/Atoms/Button/Hamburger";
import { MobileNavbarProps } from "./types";
import { useEffect, useState } from "react";
import MobileNavLinks from "@/components/Molecules/Links/Navbar/Mobile";

const MobileNavbar = ({ dict, lang, session }: MobileNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [menuAnimation, setMenuAnimation] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMenuAnimation("animate-fade-in");
      setIsMenuOpen(true);
    } else {
      setMenuAnimation("animate-fade-out");
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 300);
    }
  }, [isOpen]);

  return (
    <>
      <HamburgerButton onClick={() => setIsOpen((prev) => !prev)} />
      {isMenuOpen && (
        <div
          className={`grid justify-center content-center lg:hidden fixed left-0 top-0 bottom-0 right-0 bg-white/80 dark:bg-black/80 inset-0 backdrop-filter backdrop-blur-lg z-40 ${menuAnimation}`}
        >
          <MobileNavLinks
            dict={dict}
            lang={lang}
            session={session}
            setIsMenuOpen={setIsOpen}
          />
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
