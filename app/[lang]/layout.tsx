import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import Providers from "../providers";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collectify",
  description: "A simple way to collect and share your favorite things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} bg-light text-dark dark:bg-dark dark:text-light`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
