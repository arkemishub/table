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

import { TableColumn, TableComponents } from "../../types";
import { ISortData } from "../../hooks";
import { useCallback, useMemo } from "react";

function Icon({ type }: { type: "asc" | "desc" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      style={{
        marginLeft: 4,
        height: 12,
        width: 12,
        ...(type === "asc" ? { transform: "rotate(180deg)" } : {}),
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
      />
    </svg>
  );
}

function TableHeadCell({
  className,
  id,
  style,
  label,
  sort,
  sortable,
  setSort,
  sortType,
  renderHeader,
  components,
}: TableColumn & Partial<ISortData> & { components?: TableComponents }) {
  const isSortingEnabled = sortable && sortType !== "custom";

  const columnSort = useMemo(() => {
    if (isSortingEnabled) {
      return sort?.find((s) => s.key === id);
    }
    return undefined;
  }, [sort, isSortingEnabled, id]);

  const handleChangeSort = useCallback(() => {
    if (isSortingEnabled) {
      const newSort = sort?.filter((s) => s.key !== id) ?? [];

      if (columnSort) {
        if (columnSort.type === "asc") {
          setSort?.([...newSort, { key: id, type: "desc" }]);
        } else {
          setSort?.(newSort);
        }
      } else {
        setSort?.([...newSort, { key: id, type: "asc" }]);
      }
    }
  }, [columnSort, id, setSort, sort, isSortingEnabled]);

  const Th = components?.TableHead ?? "th";

  return (
    <Th
      scope="col"
      className={className}
      style={{
        ...style,
        ...(isSortingEnabled
          ? {
              cursor: "pointer",
            }
          : {}),
      }}
      onClick={handleChangeSort}
    >
      {renderHeader?.() ?? label}
      {columnSort && <Icon type={columnSort.type} />}
    </Th>
  );
}

export default TableHeadCell;
