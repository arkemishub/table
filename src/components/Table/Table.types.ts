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
import { Column, TableComponents } from "../../types";
import { IUseTableForwardedProps } from "../../hooks";

type ITableProps = {
  /**
   * Table Columns
   */
  columns: Omit<Column, "availableFilterOperators">[];
  data: Record<string, unknown>[];
  actions?: ActionsConfig;
  noResult?: ReactNode;
  renderHeader?: (column: Column) => ReactNode;
  components?: TableComponents;
} & Partial<IUseTableForwardedProps<any, any, any>>;

interface ActionsConfig {
  label: string;
  position?: "start" | "end";
  className?: string;
  style?: CSSProperties;
  actions: Array<Action>;
}

interface Action {
  content: ((data: Record<string, unknown>) => ReactNode) | ReactNode;
  onClick?: (data: Record<string, unknown>) => void;
}

export { ITableProps, Action };
