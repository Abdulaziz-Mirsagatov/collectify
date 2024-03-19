export interface RegularSelectInputProps<T extends Record<string, any>> {
  selected: T;
  setSelected: React.Dispatch<React.SetStateAction<T>>;
  options: T[];
  labelKey: string;
  dict: Record<string, any>;
  dictKey: string;
}
