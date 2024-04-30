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

import { Cell, Row, Types } from "../types";
import { initCell } from "./cell";

export type BaseRow<TData extends any> = {
  getAllCells: () => Cell<TData>[];
  id: string;
  data: TData;
};

export function initRow<TData extends any>(
  table: Types<TData>,
  id: string,
  data: TData
) {
  let row: BaseRow<TData> = {
    id,
    data,
    getAllCells: () =>
      table
        .getAllColumns()
        .map((column) => initCell(table, column, row as Row<TData>)),
  };

  for (const feature of table.features) {
    feature.initRow?.(table, row as Row<TData>);
  }

  return row;
}
