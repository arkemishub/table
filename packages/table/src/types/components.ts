import { Column } from "./column";
import { ReactElement } from "react";

type TableComponents = Partial<
  Record<
    string,
    (value: any, rowData: Record<string, any>, column: Column) => ReactElement
  >
> & {
  ExpandedRow?: (rowData: Record<string, any>) => ReactElement;
};

export type { TableComponents };
