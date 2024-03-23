export interface KebabMenuProps {
  options: KebabMenuOption[];
  alignment?: "left" | "right";
  outsideClickHandling?: boolean;
}

export interface KebabMenuOption {
  label: string | React.ReactNode;
  onClick?: () => Promise<void>;
}
