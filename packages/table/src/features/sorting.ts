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

export type Sort = "asc" | "desc" | undefined;
export type SortingState = Record<string, Sort>;

export type SortTableState = {
  sorting: SortingState;
};

export type SortingOptions = {
  onSortingChange: (sorting: SortingState) => void;
};

export type SortingColumn = {
  getSortingValue: () => Sort;
  setSort: (value: Sort) => void;
};

export type SortingInstance<TData extends any> = {
  setSorting: (sorting: SortingState) => void;
};

export const sorting: TableFeature = {
  getDefaultOptions: (table) => ({
    onSortingChange: (sorting) =>
      table.setState((prev) => ({ ...prev, sorting })),
  }),
  getInitialState: (state) => ({
    sorting: {},
    ...state,
  }),
  init: (table) => {
    table.setSorting = (sorting) => table.options.onSortingChange?.(sorting);
  },
  initColumn: (table, column) => {
    column.getSortingValue = () => table.getState().sorting?.[column.id];
    column.setSort = (value) =>
      table.setSorting({
        ...table.getState().sorting,
        [column.id]: value,
      });
  },
};
