export interface RegularModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  trigger: React.ReactNode;
}
