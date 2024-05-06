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

// pagination is currently manual only

import * as React from "react";
import { TableFeature } from "../types";
import { functionalUpdate } from "../utils/functional-update";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_INDEX = 0;

export type PaginationState = {
  pageSize: number;
  pageIndex: number;
};

export type PaginationTableState = {
  pagination: PaginationState;
};

export type PaginationOptions = {
  onPaginationChange: (updater: React.SetStateAction<PaginationState>) => void;
  pageCount?: number;
  rowCount?: number;
};

export type PaginationInstance = {
  setPagination: (updater: React.SetStateAction<PaginationState>) => void;
  setPageIndex: (updater: React.SetStateAction<number>) => void;
  setPageSize: (updater: React.SetStateAction<number>) => void;
  getPageCount: () => number;
  getRowCount: () => number;
  nextPage: () => void;
  previousPage: () => void;
};

const getDefaultPaginationState = (): PaginationState => ({
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
});

export const pagination: TableFeature = {
  getDefaultOptions: (table) => ({
    onPaginationChange: (updater) =>
      table.setState((prev) => ({
        ...prev,
        pagination: functionalUpdate(updater, prev.pagination),
      })),
  }),
  getInitialState: (state) => ({
    ...state,
    pagination: {
      ...getDefaultPaginationState(),
      ...state?.pagination,
    },
  }),
  init: (table) => {
    table.setPagination = (updater) =>
      table.options.onPaginationChange?.(updater);
    table.setPageIndex = (updater) =>
      table.setPagination((prev) => {
        return {
          ...prev,
          pageIndex: functionalUpdate(updater, prev.pageIndex),
        };
      });
    table.nextPage = () => table.setPageIndex((prev) => prev + 1);
    table.previousPage = () =>
      table.setPageIndex((prev) => Math.max(prev - 1, 0));
    table.setPageSize = (updater) =>
      table.setPagination((prev) => {
        return { ...prev, pageSize: functionalUpdate(updater, prev.pageSize) };
      });
    table.getPageCount = () =>
      table.options.pageCount ??
      Math.ceil(table.getRowCount() / table.getState().pagination.pageSize);
    table.getRowCount = () => table.options.rowCount ?? 0;
  },
};
