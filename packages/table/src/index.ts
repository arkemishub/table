import * as React from "react";
import { Table, TableOptions, TableResolvedOptions } from "./types/table";
import { pagination } from "./features/pagination";
import { functionalUpdate } from "./utils/functional-update";

const features = [pagination];

function initTable(options: TableOptions): Table {
  let initialState = options?.initialState ?? {};
  features.forEach((feature) => {
    initialState = feature.getInitialState?.(initialState) ?? initialState;
  });

  let table = {} as Table;

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
  } as Table;

  Object.assign(table, instance);

  features.forEach((feature) => feature.init(table));

  return table;
}

export function useTable(options: TableOptions) {
  const [table] = React.useState(() =>
    initTable({
      state: {},
      onStateChange: () => {},
      ...options,
    })
  );
  const [state, setState] = React.useState(() => table.initialState);

  table.setOptions((prev) => ({
    ...prev,
    ...options,
    state: {
      ...state,
      ...options.state,
    },
    onStateChange: (state) => {
      setState(state);
      options.onStateChange?.(state);
    },
  }));

  return table;
}
