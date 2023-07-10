import { Column, ColumnType } from "./column";
import { ReactElement } from "react";

type TableComponents = Partial<
  Record<
    ColumnType,
    (value: any, rowData: Record<string, any>, column: Column) => ReactElement
  >
> & {
  ExpandedRow?: (rowData: Record<string, any>) => ReactElement;
};

export type { TableComponents };
