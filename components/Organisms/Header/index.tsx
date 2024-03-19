import { HeaderProps } from "./types";

const Header = ({ title, children }: HeaderProps) => {
  return (
    <header className="flex justify-between">
      <h1 className="text-3xl font-bold">{title}</h1>
      {children}
    </header>
  );
};

export default Header;
