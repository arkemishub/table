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
