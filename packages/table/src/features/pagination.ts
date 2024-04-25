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

import { TableFeature } from "../types/feature";

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
  onPaginationChange: (pagination: PaginationState) => void;
};

export type PaginationInstance = {
  setPagination: (pagination: PaginationState) => void;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
};

const getDefaultPaginationState = (): PaginationState => ({
  pageIndex: DEFAULT_PAGE_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
});

export const pagination: TableFeature = {
  getDefaultOptions: (table) => ({
    onPaginationChange: (pagination) =>
      table.setState((prev) => ({ ...prev, pagination })),
  }),
  getInitialState: (state) => ({
    ...state,
    pagination: {
      ...getDefaultPaginationState(),
      ...state?.pagination,
    },
  }),
  init: (table) => {
    table.setPagination = (pagination) =>
      table.options.onPaginationChange?.(pagination);
    table.setPageIndex = (pageIndex) =>
      table.setPagination({ ...table.getState().pagination, pageIndex });
    table.setPageSize = (pageSize) =>
      table.setPagination({ ...table.getState().pagination, pageSize });
  },
};
