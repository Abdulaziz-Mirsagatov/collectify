import { CUSTOM_FIELD_TYPES } from "@/constants/customFields";
import { CustomField, ItemCustomFieldValue } from "@/types/env";

export default function getCustomFieldValue(
  field: CustomField,
  value: ItemCustomFieldValue
) {
  switch (field.type) {
    case CUSTOM_FIELD_TYPES.BOOLEAN:
      return value.booleanValue;
    case CUSTOM_FIELD_TYPES.DATE:
      return value.dateValue;
    case CUSTOM_FIELD_TYPES.MULTILINE:
      return value.multilineValue;
    case CUSTOM_FIELD_TYPES.NUMBER:
      return value.intValue;
    case CUSTOM_FIELD_TYPES.TEXT:
      return value.stringValue;
  }
}
