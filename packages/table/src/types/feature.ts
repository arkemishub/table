import {
  Cell,
  Column,
  Row,
  Table,
  TableResolvedOptions,
  TableState,
} from "./table";

export type TableFeature<TData extends any = any> = {
  getInitialState?: (state?: Partial<TableState>) => Partial<TableState>;
  init: (table: Table<TData>) => void;
  getDefaultOptions?: (
    table: Table<TData>
  ) => Partial<TableResolvedOptions<TData>>;
  initColumn?: (table: Table<TData>, column: Column<any>) => void;
  initRow?: (table: Table<TData>, row: Row<TData>) => void;
  initCell?: (
    table: Table<TData>,
    cell: Cell<TData>,
    column: Column<TData>,
    row: Row<TData>
  ) => void;
};
