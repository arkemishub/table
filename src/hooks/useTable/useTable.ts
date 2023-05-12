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

import { useReducer, useState } from "react";
import usePagination from "../usePagination";
import type { Filter, Sort } from "../../types";
import type {
  IPaginationConfig,
  IUseTableConfig,
  IUseTableData,
  TableState,
  UseTableAction,
} from "./useTable.types";
import { default as availableFilters } from "../../constants/filters";

function tableReducer(state: TableState, action: UseTableAction) {
  const { type, payload } = action;

  switch (type) {
    case "updateCurrentPage":
      return { ...state, currentPage: payload };
    case "updatePageSize":
      return { ...state, pageSize: payload };
    case "toggleVisibleItem":
      return {
        ...state,
        visibleColumns: state.visibleColumns.includes(payload)
          ? state.visibleColumns.filter((c) => c !== payload)
          : [...state.visibleColumns, payload],
      };
    case "toggleAllVisibleItems":
      return {
        ...state,
        visibleColumns: payload?.every((c) =>
          state.visibleColumns.includes(c.id)
        )
          ? []
          : payload?.map((c) => c.id),
      };
    case "setFilters":
      return {
        ...state,
        filters: payload,
      };
    case "resetAllFilters":
      return {
        ...state,
        filters: [],
      };
    case "setSort":
      return {
        ...state,
        sort: payload,
      };
    case "refresh":
      return { ...state, ...payload };
    default:
      return state;
  }
}

function useTable<
  P extends IPaginationConfig | undefined,
  S extends boolean | undefined
>(config: IUseTableConfig<P, S> | null): IUseTableData<P, S> {
  const { pagination, columns, sorting } = config ?? {};
  const [prevConfig, setPrevConfig] = useState(config ?? null);
  const [{ currentPage, pageSize, visibleColumns, filters, sort }, dispatch] =
    useReducer(tableReducer, {
      currentPage: pagination?.initialPage || 0,
      pageSize: pagination?.pageSize || 10,
      visibleColumns: columns?.map((c) => c.id) ?? [],
      filters: [],
      sort: sorting?.default ?? [],
    });

  if (JSON.stringify(config) !== JSON.stringify(prevConfig)) {
    setPrevConfig(config);
    dispatch({
      type: "refresh",
      payload: {
        pageSize: config?.pagination?.pageSize ?? 10,
        currentPage: config?.pagination?.initialPage ?? 0,
        visibleColumns: config?.columns?.map((c) => c.id) ?? [],
        sort: [],
      },
    });
  }

  const { pages, pageCount } = usePagination({
    totalCount: pagination?.totalCount ?? 0,
    pageSize,
    currentPage,
  });

  let data = {};

  if (pagination) {
    data = {
      ...data,
      goToPage: (page: number) => {
        dispatch({ type: "updateCurrentPage", payload: page });
        pagination.onChange?.(page);
      },
      setPageSize: (size: number) =>
        dispatch({ type: "updatePageSize", payload: size }),
      pageCount,
      pages,
      currentPage,
      paginationType: pagination.type,
    };
  }

  if (columns) {
    data = {
      ...data,
      filters,
      allColumns: columns.map((c) => ({
        ...c,
        toggleHide: () =>
          dispatch({ type: "toggleVisibleItem", payload: c.id }),
        isHidden: !visibleColumns.includes(c.id),
        availableFilterOperators:
          c?.availableFilterOperators ?? (c?.type && availableFilters[c.type]),
      })),
      toggleHideAll: () =>
        dispatch({ type: "toggleAllVisibleItems", payload: columns }),
      columns: columns
        .filter((c) => visibleColumns.includes(c.id))
        .map((column) => ({ ...column, sortable: column?.sortable ?? true })),
      setFilters: (filters: Filter[]) =>
        dispatch({ type: "setFilters", payload: filters }),
      resetAllFilters: () =>
        dispatch({ type: "resetAllFilters", payload: undefined }),
    };

    if (sorting) {
      data = {
        ...data,
        sort,
        sortable: !!config?.sorting?.sortable,
        setSort: (sort: Sort[]) => dispatch({ type: "setSort", payload: sort }),
        sortType: sorting.type,
      };
    }
  }

  return { tableProps: data, ...data } as IUseTableData<P, S>;
}

export default useTable;
