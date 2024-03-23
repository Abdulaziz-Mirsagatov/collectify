import RegularTableRow from "@/components/Molecules/Row/Table/Regular";
import { RegularTableProps } from "./types";

const RegularTable = <T extends Record<string, any>>({
  rows,
  columns,
  dict,
  buttons,
  lang,
  hasImage = true,
}: RegularTableProps<T>) => {
  const count = columns.length;

  return (
    <div className="grid gap-4 min-w-max">
      {rows.map((row, i) => (
        <RegularTableRow
          row={row}
          columns={columns}
          key={row.id}
          count={count}
          dict={dict}
          button={buttons ? buttons[i] : undefined}
          lang={lang}
          hasImage={hasImage}
        />
      ))}
    </div>
  );
};

export default RegularTable;
