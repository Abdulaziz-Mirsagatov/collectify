import { HeaderProps } from "./types";

const Header = ({ title, children }: HeaderProps) => {
  return (
    <header className="flex flex-wrap gap-x-2 gap-y-4 justify-between items-center">
      <h1 className="text-2xl lg:text-3xl font-bold">{title}</h1>
      {children}
    </header>
  );
};

export default Header;
