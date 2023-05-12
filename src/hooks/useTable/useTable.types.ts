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

import { Column, Filter, Sort } from "../../types";

type AllColumns = Array<
  Column & {
    toggleHide: () => void;
    isHidden: boolean;
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

type ISortConfig = { default?: Sort[]; sortable?: boolean; type?: "custom" };

interface IUseTableConfig<Pagination, Sort> {
  pagination?: Pagination;
  columns: Column[];
  sorting?: ISortConfig;
}

interface IPaginationData {
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
  pageCount: number;
  pages: number[];
  currentPage: number;
  paginationType?: "custom";
}

type IColumnsData = {
  allColumns: AllColumns;
  toggleHideAll: () => void;
  columns: Array<Omit<Column, "availableFilterOperators">>;
  resetAllFilters: () => void;
  setFilters: (filters: Filter[]) => void;
  filters: Array<Filter>;
};

type ISortData = {
  sort: Sort[];
  setSort: (sort: Sort[]) => void;
  sortable: boolean;
  sortType?: "custom";
};

type IUseTableResult<Pagination, Sort> = (Pagination extends undefined
  ? undefined
  : IPaginationData) &
  (Sort extends undefined ? undefined : ISortData) &
  IColumnsData;

type IUseTableData<Pagination, Sort> = {
  tableProps: IUseTableResult<Pagination, Sort>;
} & IUseTableResult<Pagination, Sort>;

type TableState = {
  currentPage: number;
  pageSize: number;
  visibleColumns: string[];
  filters: Filter[];
  sort: Sort[];
};

type UseTableAction =
  | {
      type: "updateCurrentPage" | "updatePageSize";
      payload: number;
    }
  | { type: "toggleVisibleItem"; payload: string }
  | { type: "toggleAllVisibleItems"; payload: Column[] }
  | { type: "refresh"; payload: Partial<TableState> }
  | { type: "setFilters"; payload: Filter[] }
  | { type: "resetAllFilters"; payload: undefined }
  | { type: "setSort"; payload: Sort[] };

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
};
