export interface DeleteModalProps {
  type: "collection" | "item";
  name: string;
  dict: Record<string, any>;
  deleteHandler: (id: string) => void | Promise<void>;
  id: string;
  redirectPath?: string;
}
