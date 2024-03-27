import { CustomField } from "@/types/env";

export interface CustomFieldInputProps {
  customField: CustomField;
  value: any;
  onChange: (value: any) => void;
}
