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

import { Column, Row, Table, Cell } from "../types/table";

export type BaseCell<TData extends any> = {
  column: Column<TData>;
  getValue: () => any;
  id: string;
  row: Row<TData>;
};
export function initCell<TData extends any>(
  table: Table<TData>,
  column: Column<TData>,
  row: Row<TData>
) {
  let cell: Cell<TData> = {
    id: `${row.id}_${column.id}`,
    row,
    column,
    getValue: () => (row.data as any)[column.id],
  };

  for (const feature of table.features) {
    feature.initCell?.(table, cell, column, row);
  }

  return cell;
}
