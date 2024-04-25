import { Column, Row, Table, Cell } from "../types/table";

export type BaseCell<TData extends any> = {
  column: Column<TData>;
  getValue: () => any;
  id: string;
  row: Row<TData>;
};
export function initCell<TData extends any>(
  table: Table<TData>,
  column: Column<TData>,
  row: Row<TData>
) {
  let cell: Cell<TData> = {
    id: `${row.id}_${column.id}`,
    row,
    column,
    getValue: () => (row.data as any)[column.id],
  };

  for (const feature of table.features) {
    feature.initCell?.(table, cell, column, row);
  }

  return cell;
}
