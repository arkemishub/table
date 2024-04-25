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

import { Table, TableOptions, TableResolvedOptions } from "../types/table";
import { functionalUpdate } from "../utils/functional-update";
import { pagination } from "../features/pagination";
import { initColumn } from "./column";
import { columnVisibility } from "../features/column-visibility";
import { initRow } from "./row";
import { columnFiltering } from "../features/column-filtering";

const features = [pagination, columnVisibility, columnFiltering];
export function initTable<TData extends any>(
  options: TableOptions<TData>
): Table<TData> {
  let initialState = options?.initialState ?? {};
  features.forEach((feature) => {
    initialState = feature.getInitialState?.(initialState) ?? initialState;
  });

  let table = { features } as Table<TData>;

  const defaultOptions = features.reduce(
    (obj, feature) => Object.assign(obj, feature.getDefaultOptions?.(table)),
    {} as TableResolvedOptions<TData>
  );

  let instance = {
    options: {
      ...defaultOptions,
      ...options,
    },
    initialState,
    setOptions: (updater) => {
      table.options = functionalUpdate(updater, table.options);
    },
    getState: () => table.options.state,
    setState: (updater) => {
      table.options.onStateChange?.(updater);
    },
    getAllColumns: () =>
      table.options.columns?.map((column) => initColumn(table, column)) ?? [],
    getRows: () =>
      table.options.data?.map((data, index) =>
        initRow(table, index.toString(), data)
      ),
  } as Table<TData>;

  Object.assign(table, instance);

  features.forEach((feature) => feature.init(table));

  return table;
}
