export interface DeleteModalProps {
  type: "collection" | "item" | "user";
  name: string;
  dict: Record<string, any>;
  deleteHandler: (id: string) => void | Promise<void>;
  id: string;
  redirectPath?: string;
  trigger?: React.ReactNode;
  imageUrl?: string;
}
