import * as React from "react";
import { TableOptions } from "./types/table";
import { initTable } from "./core/table";

export function useTable<TData extends any>(options: TableOptions<TData>) {
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
