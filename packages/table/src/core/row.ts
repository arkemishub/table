import { Cell, Row, Table } from "../types/table";
import { initCell } from "./cell";

export type BaseRow<TData extends any> = {
  getAllCells: () => Cell<TData>[];
  id: string;
  data: TData;
};

export function initRow<TData extends any>(
  table: Table<TData>,
  id: string,
  data: TData
) {
  let row: BaseRow<TData> = {
    id,
    data,
    getAllCells: () =>
      table
        .getAllColumns()
        .map((column) => initCell(table, column, row as Row<TData>)),
  };

  for (const feature of table.features) {
    feature.initRow?.(table, row as Row<TData>);
  }

  return row;
}
