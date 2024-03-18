import RegularTableRow from "@/components/Molecules/Row/Table/Regular";
import { RegularTableProps } from "./types";

const RegularTable = <T extends Record<string, any>>({
  rows,
  columns,
  dict,
  button,
}: RegularTableProps<T>) => {
  const count = columns.length;

  return (
    <div className="grid gap-4 min-w-max">
      {rows.map((row) => (
        <RegularTableRow
          row={row}
          columns={columns}
          key={row.id}
          count={count}
          dict={dict}
          button={button}
        />
      ))}
    </div>
  );
};

export default RegularTable;
