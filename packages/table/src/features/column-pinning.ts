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

import * as React from "react";
import { Cell, Column, TableFeature } from "../types";
import { functionalUpdate } from "../utils/functional-update";

export type ColumnPinningState = Record<string, boolean>;

export type ColumnPinningTableState = {
  columnPinning: ColumnPinningState;
};

export type ColumnPinningOptions = {
  onColumnPinningChange: (
    updater: React.SetStateAction<ColumnPinningState>
  ) => void;
};

export type ColumnPinningInstance<TData extends any> = {
  setColumnPinning: (updater: React.SetStateAction<ColumnPinningState>) => void;
  getAllPinnedColumns: () => Column<TData>[];
  getVisiblePinnedColumns: () => Column<TData>[];
  getVisibleUnpinnedColumns: () => Column<TData>[];
};

export type ColumnPinningColumn = {
  isPinned: () => boolean;
  pin: (value?: boolean) => void;
};

export type ColumnPinningRow<TData extends any> = {
  getAllPinnedCells: () => Cell<TData>[];
  getVisiblePinnedCells: () => Cell<TData>[];
  getVisibleUnpinnedCells: () => Cell<TData>[];
};

export const columnPinning: TableFeature = {
  getDefaultOptions: (table) => ({
    onColumnPinningChange: (updater) =>
      table.setState((prev) => ({
        ...prev,
        columnPinning: functionalUpdate(updater, prev.columnPinning),
      })),
  }),
  getInitialState: (state) => ({
    columnPinning: {},
    ...state,
  }),
  init: (table) => {
    table.setColumnPinning = (updater) =>
      table.options.onColumnPinningChange?.(updater);
    table.getAllPinnedColumns = () =>
      table.getAllColumns().filter((column) => column.isPinned());
    table.getVisiblePinnedColumns = () =>
      table.getVisibleColumns().filter((column) => column.isPinned());
    table.getVisibleUnpinnedColumns = () =>
      table.getVisibleColumns().filter((column) => !column.isPinned());
  },
  initColumn: (table, column) => {
    column.isPinned = () => table.getState().columnPinning[column.id] ?? false;
    column.pin = (value) =>
      table.setColumnPinning((prev) => ({
        ...prev,
        [column.id]: value ?? !prev[column.id],
      }));
  },
  initRow: (table, row) => {
    row.getAllPinnedCells = () =>
      row.getAllCells().filter((cell) => cell.column.isPinned());
    row.getVisiblePinnedCells = () =>
      row.getVisibleCells().filter((cell) => cell.column.isPinned());
    row.getVisibleUnpinnedCells = () =>
      row.getVisibleCells().filter((cell) => !cell.column.isPinned());
  },
};
