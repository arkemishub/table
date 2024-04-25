import { TableFeature } from "../types/feature";

export type ColumnFilteringState = Record<string, unknown>;

export type ColumnFilteringTableState = {
  columnFilters: ColumnFilteringState;
};

export type ColumnFilteringOptions = {
  onColumnFiltersChange: (columnFilters: ColumnFilteringState) => void;
};

export type ColumnFilteringColumn = {
  getFilterValue: () => unknown;
  setFilter: (value: unknown) => void;
};

export type ColumnFilteringInstance<TData extends any> = {
  setColumnFilters: (columnFilters: ColumnFilteringState) => void;
};

export const columnFiltering: TableFeature = {
  getDefaultOptions: (table) => ({
    onColumnFiltersChange: (columnFilters) =>
      table.setState((prev) => ({ ...prev, columnFilters })),
  }),
  getInitialState: (state) => ({
    ...state,
    columnFilters: {},
  }),
  init: (table) => {
    table.setColumnFilters = (columnFilters) =>
      table.options.onColumnFiltersChange?.(columnFilters);
  },
  initColumn: (table, column) => {
    column.getFilterValue = () => table.getState().columnFilters?.[column.id];
    column.setFilter = (value) =>
      table.setColumnFilters({
        ...table.getState().columnFilters,
        [column.id]: value,
      });
  },
};
