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
  ColumnVisibilityTableState,
} from "../features/column-visibility";
import { TableFeature } from "./feature";

export type TableState = PaginationTableState & ColumnVisibilityTableState;

export type TableBaseOptions = {
  columns: ColumnDef[];
  state: Partial<TableState>;
  onStateChange: React.Dispatch<React.SetStateAction<TableState>>;
  initialState?: TableState;
};

export type TableResolvedOptions = TableBaseOptions &
  PaginationOptions &
  ColumnVisibilityOptions;
export type TableOptions = Partial<TableResolvedOptions>;

export type TableBaseInstance = {
  features: TableFeature[];
  setOptions: React.Dispatch<React.SetStateAction<TableOptions>>;
  options: TableOptions;
  initialState: TableState;
  getState: () => TableState;
  setState: React.Dispatch<React.SetStateAction<TableState>>;
  getAllColumns: () => Column<any>[];
};

export type Table = TableBaseInstance &
  PaginationInstance &
  ColumnVisibilityInstance;

export type ColumnDef = {
  id: string;
};

export type Column<TData extends any> = ColumnDef & ColumnVisibilityColumn;
