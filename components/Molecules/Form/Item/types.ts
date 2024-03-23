export interface ItemFormProps {
  dict: Record<string, any>;
  type: "create" | "edit";
  collectionId: string;
  id?: string;
  trigger?: React.ReactNode;
}

export interface FIELD_TYPE {
  name: string;
}
