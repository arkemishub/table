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

import { Row, TableFeature } from "../types";

export type RowSelectionState = Record<string, boolean>;

export type RowSelectionTableState = {
  rowSelection: RowSelectionState;
};

export type RowSelectionOptions = {
  onRowSelectionChange: (rowSelection: RowSelectionState) => void;
};

export type RowSelectionInstance<TData extends any> = {
  setRowSelection: (rowSelection: RowSelectionState) => void;
  getSelectedRows: () => Row<TData>[];
};

export type RowSelectionRow<TData extends any> = {
  isSelected: () => boolean;
  toggleRowSelection: (value?: boolean) => void;
};

export const rowSelection: TableFeature = {
  getDefaultOptions: (table) => ({
    onRowSelectionChange: (rowSelection) =>
      table.setState((prev) => ({ ...prev, rowSelection })),
  }),
  getInitialState: (state) => ({
    rowSelection: {},
    ...state,
  }),
  init: (table) => {
    table.setRowSelection = (rowSelection) =>
      table.options.onRowSelectionChange?.(rowSelection);
    table.getSelectedRows = () =>
      table.getRows().filter((row) => row.isSelected());
  },
  initRow: (table, row) => {
    row.toggleRowSelection = (value) =>
      table.setRowSelection({
        ...table.getState().rowSelection,
        [row.id]: value ?? !table.getState().rowSelection[row.id],
      });
    row.isSelected = () => table.getState().rowSelection[row.id] ?? false;
  },
};
