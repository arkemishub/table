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
import { Row, TableFeature } from "../types";
import { functionalUpdate } from "../utils/functional-update";

export type RowSelectionState = Record<string, boolean>;

export type RowSelectionTableState = {
  rowSelection: RowSelectionState;
};

export type RowSelectionOptions = {
  onRowSelectionChange: (
    updater: React.SetStateAction<RowSelectionState>
  ) => void;
};

export type RowSelectionInstance<TData extends any> = {
  setRowSelection: (updater: React.SetStateAction<RowSelectionState>) => void;
  getSelectedRows: () => Row<TData>[];
};

export type RowSelectionRow<TData extends any> = {
  isSelected: () => boolean;
  toggleRowSelection: (value?: boolean) => void;
};

export const rowSelection: TableFeature = {
  getDefaultOptions: (table) => ({
    onRowSelectionChange: (updater) =>
      table.setState((prev) => ({
        ...prev,
        rowSelection: functionalUpdate(updater, prev.rowSelection),
      })),
  }),
  getInitialState: (state) => ({
    rowSelection: {},
    ...state,
  }),
  init: (table) => {
    table.setRowSelection = (updater) =>
      table.options.onRowSelectionChange?.(updater);
    table.getSelectedRows = () =>
      table.getRows().filter((row) => row.isSelected());
  },
  initRow: (table, row) => {
    row.toggleRowSelection = (value) =>
      table.setRowSelection((prev) => ({
        ...prev,
        [row.id]: value ?? !prev[row.id],
      }));
    row.isSelected = () => table.getState().rowSelection[row.id] ?? false;
  },
};
