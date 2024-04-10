import * as React from "react";
import {
  PaginationInstance,
  PaginationOptions,
  PaginationTableState,
} from "../features/pagination";

export type TableState = PaginationTableState;

export type TableBaseOptions = {
  state: Partial<TableState>;
  onStateChange: React.Dispatch<React.SetStateAction<TableState>>;
  initialState?: TableState;
};

export type TableResolvedOptions = TableBaseOptions & PaginationOptions;
export type TableOptions = Partial<TableResolvedOptions>;

export type TableBaseInstance = {
  setOptions: React.Dispatch<React.SetStateAction<TableOptions>>;
  options: TableOptions;
  initialState: TableState;
  getState: () => TableState;
  setState: React.Dispatch<React.SetStateAction<TableState>>;
};

export type Table = TableBaseInstance & PaginationInstance;
