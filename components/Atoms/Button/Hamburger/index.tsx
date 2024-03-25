"use client";

import { Icon } from "@iconify/react";
import { HamburgerButtonProps } from "./types";

const HamburgerButton = ({ onClick }: HamburgerButtonProps) => {
  return (
    <Icon
      icon="solar:hamburger-menu-broken"
      className="text-3xl cursor-pointer z-50 fixed top-4 right-4 lg:hidden"
      onClick={onClick}
    />
  );
};

export default HamburgerButton;
