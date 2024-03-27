import { CUSTOM_FIELD_TYPES } from "@/constants/customFields";
import { CustomFieldInputProps } from "./types";

const CustomFieldInput = ({
  customField,
  value,
  onChange,
}: CustomFieldInputProps) => {
  const { id, type, name } = customField;

  switch (type) {
    case CUSTOM_FIELD_TYPES.MULTILINE:
      return (
        <textarea
          placeholder={name}
          className={`input`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case CUSTOM_FIELD_TYPES.BOOLEAN:
      return (
        <div className="flex items-center gap-4">
          <label htmlFor={id}>{name}</label>
          <input
            type="checkbox"
            className={`input`}
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
        </div>
      );
    case CUSTOM_FIELD_TYPES.DATE:
      const date = new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Tashkent",
      });
      const [month, day, year] = date.split("/");
      return (
        <input
          type={type}
          placeholder={name}
          className={`input`}
          value={`${year}-${month}-${day}`}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    default:
      return (
        <input
          type={type}
          placeholder={name}
          className={`input`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
};

export default CustomFieldInput;
