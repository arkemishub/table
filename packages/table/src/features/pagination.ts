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
