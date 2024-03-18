import { RegularTableRowProps } from "./types";

const renderItem = <T extends Record<string, any>>(row: T, column: string) => {
  if (Object.hasOwn(row, column)) return row[column];
  else return "-";
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
}: RegularTableRowProps<T>) => {
  return (
    <div className="flex bg-light-gray dark:bg-dark-gray rounded-xl shadow-lg p-4">
      <div
        className="grow grid"
        style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
      >
        {columns.map((column) => (
          <div className="grid gap-2">
            <span className="font-bold text-xl text-center">
              {renderColumn(column, dict)}
            </span>
            <span className="text-center">{renderItem(row, column)}</span>
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
