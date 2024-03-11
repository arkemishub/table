/**
 * Copyright 2023 Arkemis S.r.l.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CSSProperties, ReactNode } from "react";
import { TableColumn } from "./column";
import { TableComponents } from "./components";
import { IUseTableForwardedProps } from "../hooks";
import { Action } from "./action";

type ITableProps = {
  /**
   * Table Columns
   */
  columns: Omit<TableColumn, "availableFilterOperators">[];
  data: Record<string, unknown>[];
  actions?: ActionsConfig;
  noResult?: ReactNode;
  renderHeader?: (column: TableColumn) => ReactNode;
  components?: TableComponents;
} & Partial<IUseTableForwardedProps<any, any, any>>;

type ActionsConfig = {
  label: string | ReactNode;
  position?: "start" | "end";
  className?: string;
  style?: CSSProperties;
  actions: Array<Action>;
};

export { ITableProps };
