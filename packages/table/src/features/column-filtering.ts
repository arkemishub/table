/*
 * Copyright 2024 Arkemis S.r.l.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
