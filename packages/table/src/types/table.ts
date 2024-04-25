import * as React from "react";
import {
  PaginationInstance,
  PaginationOptions,
  PaginationTableState,
} from "../features/pagination";
import {
  ColumnVisibilityColumn,
  ColumnVisibilityInstance,
  ColumnVisibilityOptions,
  ColumnVisibilityRow,
  ColumnVisibilityTableState,
} from "../features/column-visibility";
import { TableFeature } from "./feature";
import { BaseRow } from "../core/row";
import { BaseCell } from "../core/cell";
import {
  ColumnFilteringColumn,
  ColumnFilteringInstance,
  ColumnFilteringOptions,
  ColumnFilteringTableState,
} from "../features/column-filtering";

export type TableState = PaginationTableState &
  ColumnVisibilityTableState &
  ColumnFilteringTableState;

export type TableBaseOptions<TData extends any> = {
  columns: ColumnDef[];
  state: Partial<TableState>;
  onStateChange: React.Dispatch<React.SetStateAction<TableState>>;
  initialState?: TableState;
  data: TData[];
};

export type TableResolvedOptions<TData extends any> = TableBaseOptions<TData> &
  PaginationOptions &
  ColumnVisibilityOptions &
  ColumnFilteringOptions;

export type TableOptions<TData extends any> = Partial<
  TableResolvedOptions<TData>
>;

export type TableBaseInstance<TData extends any> = {
  features: TableFeature[];
  setOptions: React.Dispatch<React.SetStateAction<TableOptions<TData>>>;
  options: TableOptions<TData>;
  initialState: TableState;
  getState: () => TableState;
  setState: React.Dispatch<React.SetStateAction<TableState>>;
  getAllColumns: () => Column<any>[];
  getRows: () => Row<TData>[];
};

export type Table<TData extends any> = TableBaseInstance<TData> &
  PaginationInstance &
  ColumnVisibilityInstance<TData> &
  ColumnFilteringInstance<TData>;

export type ColumnDef = {
  id: string;
};

export type Row<TData extends any> = BaseRow<TData> &
  ColumnVisibilityRow<TData>;

export type Cell<TData extends any> = BaseCell<TData>;

export type Column<TData extends any> = ColumnDef &
  ColumnVisibilityColumn &
  ColumnFilteringColumn;
