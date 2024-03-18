export interface RegularTableProps<T extends Record<string, any>> {
  columns: string[];
  rows: T[];
  dict: Record<string, any>;
  button?: React.ReactNode;
}
