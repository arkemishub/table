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
import { TableFeature } from "../types";
import { functionalUpdate } from "../utils/functional-update";
import pre from "@changesets/cli/dist/declarations/src/commands/pre";

export type Sort = "asc" | "desc" | undefined;
export type SortingState = Record<string, Sort>;

export type SortTableState = {
  sorting: SortingState;
};

export type SortingOptions = {
  onSortingChange: (updater: React.SetStateAction<SortingState>) => void;
  enableSorting?: boolean;
};

export type SortingColumnDef = {
  enableSorting?: boolean;
};

export type SortingColumn = {
  getSortingValue: () => Sort;
  canSort: () => boolean;
  setSort: (value: Sort) => void;
};

export type SortingInstance<TData extends any> = {
  setSorting: (updater: React.SetStateAction<SortingState>) => void;
};

export const sorting: TableFeature = {
  getDefaultOptions: (table) => ({
    onSortingChange: (updater) =>
      table.setState((prev) => ({
        ...prev,
        sorting: functionalUpdate(updater, prev.sorting),
      })),
  }),
  getInitialState: (state) => ({
    sorting: {},
    ...state,
  }),
  init: (table) => {
    table.setSorting = (updater) => table.options.onSortingChange?.(updater);
  },
  initColumn: (table, column) => {
    column.canSort = () =>
      (column.columnDef.enableSorting ?? true) &&
      (table.options.enableSorting ?? true);
    column.getSortingValue = () => table.getState().sorting?.[column.id];
    column.setSort = (value) => {
      if (column.canSort())
        table.setSorting((prevState) => ({
          ...prevState,
          [column.id]: value,
        }));
    };
  },
};
