"use client";

import { ThemeProvider } from "next-themes";
import { EdgeStoreProvider } from "./edgestore";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <EdgeStoreProvider>{children}</EdgeStoreProvider>
    </ThemeProvider>
  );
};

export default Providers;
