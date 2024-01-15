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

import { TableColumn, TableExpandedState, TableFilter, TableSort } from "../../types";

type AllColumns = Array<
  TableColumn & {
    toggleHide: () => void;
    hidden: boolean;
  }
>;

type IPaginationConfig = {
  initialPage?: number;
  pageSize?: number;
  totalCount: number;
  siblingCount?: number;
  onChange?: (page: number) => void;
  type?: "custom";
};

type ISortConfig = { default?: TableSort[]; sortable?: boolean; type?: "custom" };

interface IUseTableConfig<Pagination, TableSort, Expandable> {
  pagination?: Pagination;
  columns: TableColumn[];
  sorting?: ISortConfig;
  expandable?: Expandable;
  initialFilters?: TableFilter[];
}

interface IPaginationData {
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
  pageSize: number;
  pageCount: number;
  pages: number[];
  currentPage: number;
  paginationType?: "custom";
  totalCount?: number;
}

type IColumnsData = {
  allColumns: AllColumns;
  toggleHideAll: () => void;
  toggleHide: (columns: TableColumn[]) => void;
  columns: Array<Omit<TableColumn, "availableFilterOperators">>;
  resetAllFilters: () => void;
  setFilters: (filters: TableFilter[]) => void;
  filters: Array<TableFilter>;
};

type ISortData = {
  sort: TableSort[];
  setSort: (sort: TableSort[]) => void;
  sortable: boolean;
  sortType?: "custom";
};

type IExpandableData = {
  expandedRows: TableExpandedState;
};

type IUseTableResult<Pagination, TableSort, Expandable> =
  (Pagination extends undefined ? undefined : IPaginationData) &
    (TableSort extends undefined ? undefined : ISortData) &
    (Expandable extends true ? IExpandableData : undefined) &
    IColumnsData;

type IUseTableForwardedProps<Pagination, TableSort, Expandable> = IUseTableResult<
  Pagination,
  TableSort,
  Expandable
> & {
  onExpandRow?: (index: number) => void;
};

type IUseTableData<Pagination, TableSort, Expandable> = {
  tableProps: IUseTableForwardedProps<Pagination, TableSort, Expandable>;
} & IUseTableResult<Pagination, TableSort, Expandable>;

type TableState = {
  currentPage: number;
  pageSize: number;
  visibleColumns: string[];
  filters: TableFilter[];
  sort: TableSort[];
  expandedRows: TableExpandedState;
  initialFilters: TableFilter[];
};

type UseTableAction =
  | {
      type: "updateCurrentPage" | "updatePageSize";
      payload: number;
    }
  | { type: "toggleVisibleItem"; payload: string }
  | { type: "toggleMultipleVisibleItems"; payload: TableColumn[] }
  | { type: "toggleAllVisibleItems"; payload: TableColumn[] }
  | { type: "refresh"; payload: Partial<TableState> }
  | { type: "setFilters"; payload: TableFilter[] }
  | { type: "resetAllFilters"; payload: undefined }
  | { type: "setSort"; payload: TableSort[] }
  | { type: "setExpandedRows"; payload: number };

export {
  IUseTableData,
  IUseTableConfig,
  IPaginationData,
  IPaginationConfig,
  ISortConfig,
  ISortData,
  TableState,
  UseTableAction,
  AllColumns,
  IUseTableForwardedProps,
};
