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

import { TableColumn } from "./column";
import * as React from "react";

type TableComponents = Partial<
  Record<
    string,
    (
      value: any,
      rowData: Record<string, any>,
      column: TableColumn
    ) => React.ReactElement
  >
> & {
  ExpandedRow?: (rowData: Record<string, any>) => React.ReactElement;
  Table?: (props: React.HTMLAttributes<HTMLTableElement>) => JSX.Element | null;
  TableHeader?: (
    props: React.HTMLAttributes<HTMLTableSectionElement>
  ) => JSX.Element | null;
  TableBody?: (
    props: React.HTMLAttributes<HTMLTableSectionElement>
  ) => JSX.Element | null;
  TableRow?: (
    props: React.HTMLAttributes<HTMLTableRowElement>
  ) => JSX.Element | null;
  TableHead?: (
    props: React.ThHTMLAttributes<HTMLTableCellElement>
  ) => JSX.Element | null;
  TableCell?: (
    props: React.TdHTMLAttributes<HTMLTableCellElement>
  ) => JSX.Element | null;
  TableFooter?: (
    props: React.HTMLAttributes<HTMLTableSectionElement>
  ) => JSX.Element | null;
};

export type { TableComponents };
