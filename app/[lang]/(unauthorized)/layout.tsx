import Navbar from "@/components/Organisms/Navbar";
import { NavLink } from "@/components/Organisms/Navbar/types";

const LOCALE = "en";

export default function UnauthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks: NavLink[] = [
    {
      label: "Home",
      href: `/${LOCALE}`,
    },
    {
      label: "Collections",
      href: `collections`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navLinks={navLinks} />
      <div className="grow relative">{children}</div>
    </div>
  );
}
