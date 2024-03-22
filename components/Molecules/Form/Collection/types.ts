export interface CollectionFormProps {
  dict: Record<string, any>;
  type: "create" | "edit";
  userId?: string;
  id?: string;
}

export interface CustomField {
  name: string;
  type: string;
}

export interface FIELD_TYPE {
  name: string;
}
