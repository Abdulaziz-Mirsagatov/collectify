import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import Providers from "../providers";
import Navbar from "@/components/Organisms/Navbar";
import { Locale, i18n } from "@/i18n-config";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collectify",
  description: "A simple way to collect and share your favorite things.",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const { lang } = params;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} bg-light text-dark dark:bg-dark dark:text-light`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar lang={lang} />
            <div className="grow flex flex-col">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
