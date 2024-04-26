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
import {
  PaginationInstance,
  PaginationOptions,
  PaginationTableState,
} from "../features/pagination";
import {
  ColumnVisibilityColumn,
  ColumnVisibilityInstance,
  ColumnVisibilityOptions,
  ColumnVisibilityRow,
  ColumnVisibilityTableState,
} from "../features/column-visibility";
import { TableFeature } from "./feature";
import { BaseRow } from "../core/row";
import { BaseCell } from "../core/cell";
import {
  ColumnFilteringColumn,
  ColumnFilteringInstance,
  ColumnFilteringOptions,
  ColumnFilteringTableState,
} from "../features/column-filtering";
import {
  SortingColumn,
  SortingInstance,
  SortingOptions,
  SortTableState,
} from "../features/sorting";

export type TableState = PaginationTableState &
  ColumnVisibilityTableState &
  ColumnFilteringTableState &
  SortTableState;

export type TableBaseOptions<TData extends any> = {
  columns: ColumnDef[];
  state: Partial<TableState>;
  onStateChange: React.Dispatch<React.SetStateAction<TableState>>;
  initialState?: Partial<TableState>;
  data: TData[];
};

export type TableResolvedOptions<TData extends any> = TableBaseOptions<TData> &
  PaginationOptions &
  ColumnVisibilityOptions &
  ColumnFilteringOptions &
  SortingOptions;

export type TableOptions<TData extends any> = Partial<
  TableResolvedOptions<TData>
>;

export type TableBaseInstance<TData extends any> = {
  features: TableFeature[];
  setOptions: React.Dispatch<React.SetStateAction<TableOptions<TData>>>;
  options: TableOptions<TData>;
  initialState: TableState;
  getState: () => TableState;
  setState: React.Dispatch<React.SetStateAction<TableState>>;
  getAllColumns: () => Column<any>[];
  getRows: () => Row<TData>[];
};

export type Table<TData extends any> = TableBaseInstance<TData> &
  PaginationInstance &
  ColumnVisibilityInstance<TData> &
  ColumnFilteringInstance<TData> &
  SortingInstance<TData>;

export type ColumnDef = {
  id: string;
};

export type Row<TData extends any> = BaseRow<TData> &
  ColumnVisibilityRow<TData>;

export type Cell<TData extends any> = BaseCell<TData>;

export type Column<TData extends any> = ColumnDef &
  ColumnVisibilityColumn &
  ColumnFilteringColumn &
  SortingColumn;
