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

import { Action, ITableProps } from "./Table.types";
import { Pagination } from "../Pagination";
import { ReactNode, useCallback, useMemo, useState } from "react";
import pagination from "../Pagination/Pagination";
import { useTableConfig } from "../TableConfigProvider/TableConfigProvider";
import { Column } from "../../types";
import { TableHeadCell } from "../TableHeadCell";

function Table({
  columns,
  data,
  actions,
  pages,
  pageCount,
  currentPage = 0,
  goToPage,
  paginationType,
  sortable,
  sort,
  setSort,
  sortType,
  noResult = "No Result",
}: ITableProps) {
  const { components } = useTableConfig();

  const renderData = useCallback(
    (column: Column, row: Record<string, unknown>) => {
      if (column.render) {
        return column.render(row);
      }

      if (column.type && components[column.type]) {
        return components[column.type]?.(row?.[column.id], row, column);
      }

      return row?.[column.id] as ReactNode;
    },
    [components]
  );

  const noResultColspan = actions
    ? actions.actions.length + columns.length
    : columns.length;

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
                renderHeader={col.renderHeader}
              />
            ))}
            {actions && actions?.position === "end" && <th>{actions.label}</th>}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0
            ? data.map((row, index) => (
                <tr key={index}>
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
                      {renderData(col, row)}
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
              ))
            : noResult && (
                <tr className="arke__table__noresult">
                  <td colSpan={noResultColspan}>{noResult}</td>
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
