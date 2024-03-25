export interface DeleteModalProps {
  type: "collection" | "item" | "user" | "account" | "comment";
  name: string;
  dict: Record<string, any>;
  deleteHandler: (id: string) => void | Promise<void>;
  id: string;
  redirectPath?: string;
  trigger?: React.ReactNode;
  imageUrl?: string;
  userId?: string;
}
