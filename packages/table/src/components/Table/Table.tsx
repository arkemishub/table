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

import { ITableProps } from "./Table.types";
import { Pagination } from "../Pagination";
import { Fragment, ReactNode, useCallback, useMemo } from "react";
import pagination from "../Pagination/Pagination";
import { useTableConfig } from "../TableConfigProvider/TableConfigProvider";
import { Action, TableColumn } from "../../types";
import { TableHeadCell } from "../TableHeadCell";

const getPagedIndex = (index: number, currentPage: number, pageSize = 0) =>
  index + pageSize * currentPage;

function Table({
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
}: ITableProps) {
  const config = useTableConfig();
  const components = useMemo(
    () => ({ ...config.components, ...props.components }),
    [config.components, props.components]
  );

  const renderData = useCallback(
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

      return row?.[column.id] as ReactNode;
    },
    [components, onExpandRow, currentPage, pageSize]
  );

  const displayedColumnCount = useMemo(
    () => (actions ? actions.actions.length + columns.length : columns.length),
    [columns.length, actions?.actions.length]
  );

  const renderExpanded = useCallback(
    (row: Record<string, unknown>, index: number) => {
      if (
        !expandedRows?.[getPagedIndex(index, currentPage, pageSize)] ||
        !components.ExpandedRow
      )
        return null;

      return (
        <tr className="arke__table__row--expanded">
          <td colSpan={displayedColumnCount}>{components.ExpandedRow(row)}</td>
        </tr>
      );
    },
    [expandedRows, currentPage, pageSize, columns.length, components]
  );

  return (
    <>
      <table className="arke__table">
        <thead>
          <tr>
            {actions && actions?.position !== "end" && <th>{actions.label}</th>}
            {columns.map((col) => (
              <TableHeadCell
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
            {actions && actions?.position === "end" && <th>{actions.label}</th>}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0
            ? data.map((row, index) => (
                <Fragment key={index}>
                  <tr>
                    {actions && actions.position !== "end" && (
                      <td
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
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={col?.className}
                        style={col?.style}
                      >
                        {renderData(col, row, index)}
                      </td>
                    ))}
                    {actions && actions.position === "end" && (
                      <td
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
                      </td>
                    )}
                  </tr>
                  {renderExpanded(row, index)}
                </Fragment>
              ))
            : noResult && (
                <tr className="arke__table__noresult">
                  <td colSpan={displayedColumnCount}>{noResult}</td>
                </tr>
              )}
        </tbody>
      </table>
      {pages &&
        typeof pagination !== "undefined" &&
        goToPage &&
        paginationType !== "custom" && (
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

const TableAction = ({
  content,
  onClick,
  data,
}: Action & { data: Record<string, unknown> }) => {
  return (
    <button onClick={() => onClick?.(data)}>
      {typeof content === "function" ? content(data) : content}
    </button>
  );
};

export default Table;
