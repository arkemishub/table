import { TableColumn } from "./column";
import { ReactElement } from "react";

type TableComponents = Partial<
  Record<
    string,
    (value: any, rowData: Record<string, any>, column: TableColumn) => ReactElement
  >
> & {
  ExpandedRow?: (rowData: Record<string, any>) => ReactElement;
};

export type { TableComponents };
