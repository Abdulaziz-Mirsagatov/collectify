"use client";

import { Icon } from "@iconify/react";
import { HamburgerButtonProps } from "./types";

const HamburgerButton = ({ onClick, isMenuOpen }: HamburgerButtonProps) => {
  return (
    <Icon
      icon="solar:hamburger-menu-broken"
      className={`text-3xl cursor-pointer z-50 top-4 right-4 lg:hidden ${
        isMenuOpen ? "fixed" : "absolute"
      }`}
      onClick={onClick}
    />
  );
};

export default HamburgerButton;
