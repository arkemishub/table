import { Table, TableOptions, TableResolvedOptions } from "../types/table";
import { functionalUpdate } from "../utils/functional-update";
import { pagination } from "../features/pagination";
import { initColumn } from "./column";
import { columnVisibility } from "../features/column-visibility";

const features = [pagination, columnVisibility];
export function initTable(options: TableOptions): Table {
  let initialState = options?.initialState ?? {};
  features.forEach((feature) => {
    initialState = feature.getInitialState?.(initialState) ?? initialState;
  });

  let table = { features } as Table;

  const defaultOptions = features.reduce(
    (obj, feature) => Object.assign(obj, feature.getDefaultOptions?.(table)),
    {} as TableResolvedOptions
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
  } as Table;

  Object.assign(table, instance);

  features.forEach((feature) => feature.init(table));

  return table;
}
