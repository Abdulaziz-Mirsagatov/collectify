"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Icon } from "@iconify/react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <div
        className="p-2 rounded-full transition-colors cursor-pointer hover:bg-dark-gray hover:text-light-gray dark:hover:bg-light-gray  dark:hover:text-dark-gray"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "dark" ? (
          <Icon icon="ph:moon-bold" className="cursor-pointer text-2xl" />
        ) : (
          <Icon icon="ph-sun-fill" className="cursor-pointer text-2xl" />
        )}
      </div>
    </>
  );
};

export default ThemeToggler;
