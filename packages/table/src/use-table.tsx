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
import { TableOptions } from "./types";
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
