import { TableFeature } from "../types/feature";

export type ColumnVisibilityState = Record<string, boolean>;

export type ColumnVisibilityTableState = {
  columnVisibility: ColumnVisibilityState;
};

export type ColumnVisibilityOptions = {
  onColumnVisibilityChange: (columnVisibility: ColumnVisibilityState) => void;
};

export type ColumnVisibilityInstance = {
  setColumnVisibility: (columnVisibility: ColumnVisibilityState) => void;
};

export type ColumnVisibilityColumn = {
  isVisible: () => boolean;
  toggleVisibility: (value?: boolean) => void;
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
};
