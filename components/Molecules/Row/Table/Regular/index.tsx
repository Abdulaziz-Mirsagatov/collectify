import Image from "next/image";
import { RegularTableRowProps } from "./types";
import placeholder from "@/public/images/placeholder2.jpg";
import { Locale } from "@/i18n-config";

const renderItem = <T extends Record<string, any>>(
  row: T,
  column: string,
  locale: Locale,
  dict: Record<string, any>
) => {
  if (Object.hasOwn(row, column)) {
    if (typeof row[column] === "boolean") {
      return row[column] ? dict.yes : dict.no;
    }
    if (!row[column] || row[column].length === 0) return "-";
    else if (Array.isArray(row[column])) {
      return row[column].join(", ");
    } // if string has letter T and date
    else if (
      typeof row[column] === "string" &&
      row[column].split("").some((l: string) => l === "T") &&
      new Date(row[column]).toString() !== "Invalid Date"
    ) {
      return new Date(row[column]).toLocaleDateString(locale, {
        timeZone: "Asia/Tashkent",
      });
    }
    return Object.hasOwn(dict, row[column]) ? dict[row[column]] : row[column];
  } else return "-";
};

const renderColumn = (column: string, dict: Record<string, any>) => {
  if (Object.hasOwn(dict, column)) return dict[column];
  else return column;
};

const RegularTableRow = <T extends Record<string, any>>({
  row,
  columns,
  count,
  dict,
  button,
  lang,
  hasImage = true,
}: RegularTableRowProps<T>) => {
  return (
    <div className="flex bg-light-gray dark:bg-dark-gray rounded-xl shadow-lg p-4">
      {hasImage && (
        <div className="flex items-center justify-center-pr-4">
          <Image
            src={row.image === "" || !row.image ? placeholder : row.image}
            alt="collection image"
            width={60}
            height={60}
            className="rounded-full aspect-square object-cover"
          />
        </div>
      )}
      <div
        className="grow grid"
        style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
      >
        {columns.map((column) => (
          <div className="grid gap-2" key={column}>
            <span className="font-bold text-xl text-center">
              {renderColumn(column, dict)}
            </span>
            <span className="text-center">
              {renderItem(row, column, lang, dict)}
            </span>
          </div>
        ))}
      </div>

      {button && (
        <div className="flex items-center justify-center pl-4">{button}</div>
      )}
    </div>
  );
};

export default RegularTableRow;
