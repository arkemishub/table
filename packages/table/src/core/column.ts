import { ColumnDef, Column, Table } from "../types/table";

export function initColumn<TData extends any>(
  table: Table<TData>,
  columnDef: ColumnDef
) {
  let column: ColumnDef = {
    id: columnDef.id,
  };

  for (const feature of table.features) {
    feature.initColumn?.(table, column as Column<any>);
  }

  return column;
}
