export interface PopoverInterface {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: React.ReactNode;
  children: React.ReactNode;
  outsideClickHandling?: boolean;
}
