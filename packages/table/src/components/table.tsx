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

import * as React from "react";
import { Action, ITableProps, TableColumn } from "../types";
import { useTableConfig } from "./TableConfigProvider/TableConfigProvider";
import { TableHeadCell } from "./TableHeadCell";
import { Fragment, ReactNode } from "react";
import { Pagination } from "./Pagination";

const getPagedIndex = (index: number, currentPage: number, pageSize = 0) =>
  index + pageSize * currentPage;

const TableComponent = React.forwardRef<
  HTMLTableElement,
  { children?: ReactNode }
>((props, ref) => <table className="arke__table" {...props} ref={ref} />);

TableComponent.displayName = "TableComponent";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & ITableProps
>(
  (
    {
      columns,
      data,
      actions,
      pages,
      pageCount,
      pageSize,
      currentPage = 0,
      goToPage,
      paginationType,
      sortable,
      sort,
      setSort,
      sortType,
      noResult = "No Result",
      renderHeader,
      expandedRows,
      onExpandRow,
      ...props
    },
    ref
  ) => {
    const config = useTableConfig();
    const components = React.useMemo(
      () => ({ ...config.components, ...props.components }),
      [config.components, props.components]
    );

    const RenderedTable = components?.Table ?? TableComponent;
    const Thead = components?.TableHeader ?? "thead";
    const Tbody = components?.TableBody ?? "tbody";
    const Tr = components?.TableRow ?? "tr";
    const Th = components?.TableHead ?? "th";
    const Td = components?.TableCell ?? "td";

    const renderData = React.useCallback(
      (column: TableColumn, row: Record<string, unknown>, index: number) => {
        if (column.render) {
          return column.render(row, {
            handleExpandRow: () =>
              onExpandRow?.(getPagedIndex(index, currentPage, pageSize)),
          });
        }

        if (column.type && components[column.type]) {
          return components[column.type]?.(row?.[column.id], row, column);
        }

        return row?.[column.id] as React.ReactNode;
      },
      [components, onExpandRow, currentPage, pageSize]
    );

    const displayedColumnCount = React.useMemo(
      () =>
        actions ? actions.actions.length + columns.length : columns.length,
      [columns.length, actions?.actions.length]
    );

    const renderExpanded = React.useCallback(
      (row: Record<string, unknown>, index: number) => {
        if (
          !expandedRows?.[getPagedIndex(index, currentPage, pageSize)] ||
          !components.ExpandedRow
        )
          return null;

        return (
          <Tr className="arke__table__row--expanded">
            <Td colSpan={displayedColumnCount}>
              {components.ExpandedRow(row)}
            </Td>
          </Tr>
        );
      },
      [expandedRows, currentPage, pageSize, columns.length, components]
    );

    return (
      <>
        <RenderedTable ref={ref}>
          <Thead>
            <Tr>
              {actions && actions?.position !== "end" && (
                <Th>{actions.label}</Th>
              )}
              {columns.map((col) => (
                <TableHeadCell
                  components={components}
                  sort={sort}
                  setSort={setSort}
                  sortable={sortable && col.sortable}
                  key={col.id}
                  id={col.id}
                  label={col.label}
                  className={col.className}
                  style={col.style}
                  sortType={sortType}
                  renderHeader={() =>
                    col?.renderHeader?.() ?? renderHeader?.(col)
                  }
                />
              ))}
              {actions && actions?.position === "end" && (
                <Th>{actions.label}</Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {data?.length > 0
              ? data.map((row, index) => (
                  <Fragment key={index}>
                    <Tr>
                      {actions && actions.position !== "end" && (
                        <Td
                          className={`${
                            actions?.className ?? ""
                          } arke__table__actions`}
                          style={actions?.style}
                        >
                          {actions.actions.map((action, index) => (
                            <TableAction
                              key={index}
                              content={action.content}
                              data={row}
                              onClick={action.onClick}
                            />
                          ))}
                        </Td>
                      )}
                      {columns.map((col) => (
                        <Td
                          key={col.id}
                          className={col?.className}
                          style={col?.style}
                        >
                          {renderData(col, row, index)}
                        </Td>
                      ))}
                      {actions && actions.position === "end" && (
                        <Td
                          className={`${
                            actions?.className ?? ""
                          } arke__table__actions`}
                          style={actions?.style}
                        >
                          {actions.actions.map((action, index) => (
                            <TableAction
                              key={index}
                              content={action.content}
                              data={row}
                              onClick={action.onClick}
                            />
                          ))}
                        </Td>
                      )}
                    </Tr>
                    {renderExpanded(row, index)}
                  </Fragment>
                ))
              : noResult && (
                  <Tr className="arke__table__noresult">
                    <Td colSpan={displayedColumnCount}>{noResult}</Td>
                  </Tr>
                )}
          </Tbody>
        </RenderedTable>
        {pages && goToPage && paginationType !== "custom" && (
          <Pagination
            pageCount={pageCount as number}
            pages={pages}
            currentPage={currentPage}
            onChange={goToPage}
          />
        )}
      </>
    );
  }
);

const TableAction = ({
  content,
  onClick,
  data,
}: Action & { data: Record<string, unknown> }) => {
  return (
    <button type="button" onClick={() => onClick?.(data)}>
      {typeof content === "function" ? content(data) : content}
    </button>
  );
};

Table.displayName = "Table";

export { Table };
