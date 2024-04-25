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

import {
  Cell,
  Column,
  Row,
  Table,
  TableResolvedOptions,
  TableState,
} from "./table";

export type TableFeature<TData extends any = any> = {
  getInitialState?: (state?: Partial<TableState>) => Partial<TableState>;
  init: (table: Table<TData>) => void;
  getDefaultOptions?: (
    table: Table<TData>
  ) => Partial<TableResolvedOptions<TData>>;
  initColumn?: (table: Table<TData>, column: Column<any>) => void;
  initRow?: (table: Table<TData>, row: Row<TData>) => void;
  initCell?: (
    table: Table<TData>,
    cell: Cell<TData>,
    column: Column<TData>,
    row: Row<TData>
  ) => void;
};
