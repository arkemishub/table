import { Column, Table, TableResolvedOptions, TableState } from "./table";

export type TableFeature = {
  getInitialState?: (state?: Partial<TableState>) => Partial<TableState>;
  init: (table: Table) => void;
  getDefaultOptions?: (table: Table) => Partial<TableResolvedOptions>;
  initColumn?: (table: Table, column: Column<any>) => void;
};
