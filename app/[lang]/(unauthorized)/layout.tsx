import { getDictionary } from "@/app/dictionaries";
import Navbar from "@/components/Organisms/Navbar";
import { NavLink } from "@/components/Organisms/Navbar/types";
import { Locale } from "@/i18n-config";

export default async function UnauthorizedLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  const navLinks: NavLink[] = [
    {
      label: dict.component.navbar.home,
      href: `/${lang}`,
    },
    {
      label: dict.component.navbar.collections,
      href: `collections`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navLinks={navLinks} dictionary={dict} />
      <div className="grow relative">{children}</div>
    </div>
  );
}
