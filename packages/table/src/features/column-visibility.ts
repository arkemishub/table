import { TableFeature } from "../types/feature";
import { Cell, Column } from "../types/table";

export type ColumnVisibilityState = Record<string, boolean>;

export type ColumnVisibilityTableState = {
  columnVisibility: ColumnVisibilityState;
};

export type ColumnVisibilityOptions = {
  onColumnVisibilityChange: (columnVisibility: ColumnVisibilityState) => void;
};

export type ColumnVisibilityInstance<TData extends any> = {
  setColumnVisibility: (columnVisibility: ColumnVisibilityState) => void;
  getAllVisibleColumns: () => Column<TData>[];
};

export type ColumnVisibilityColumn = {
  isVisible: () => boolean;
  toggleVisibility: (value?: boolean) => void;
};

export type ColumnVisibilityRow<TData extends any> = {
  getAllVisibleCells: () => Cell<TData>[];
};

export const columnVisibility: TableFeature = {
  getDefaultOptions: (table) => ({
    onColumnVisibilityChange: (columnVisibility) =>
      table.setState((prev) => ({ ...prev, columnVisibility })),
  }),
  getInitialState: (state) => ({
    ...state,
    columnVisibility: {},
  }),
  init: (table) => {
    table.setColumnVisibility = (columnVisibility) =>
      table.options.onColumnVisibilityChange?.(columnVisibility);
    table.getAllVisibleColumns = () =>
      table.getAllColumns().filter((column) => column.isVisible());
  },
  initColumn: (table, column) => {
    column.isVisible = () =>
      table.getState().columnVisibility?.[column.id] ?? true;
    column.toggleVisibility = (value) =>
      table.setColumnVisibility({
        ...table.getState().columnVisibility,
        [column.id]: value ?? !column.isVisible(),
      });
  },
  initRow: (table, row) => {
    row.getAllVisibleCells = () =>
      row.getAllCells().filter((cell) => cell.column.isVisible());
  },
};
