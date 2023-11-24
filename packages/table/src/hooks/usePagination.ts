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

import { useMemo } from "react";

const range = (start: number, end: number) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 3,
  currentPage = 0,
}: {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}) => {
  return useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // first page
    if (currentPage < siblingCount) {
      const firstItem = Math.min(0, currentPage);
      const lastItem = Math.min(siblingCount * 2, totalPageCount);
      return { pageCount: totalPageCount, pages: range(firstItem, lastItem) };
    }

    // last pages
    if (totalPageCount - currentPage <= siblingCount) {
      const firstItem = Math.min(
        totalPageCount - siblingCount * 2,
        currentPage
      );
      return {
        pageCount: totalPageCount,
        pages: range(firstItem, totalPageCount - 1),
      };
    }

    const lastItem = Math.min(currentPage + siblingCount, totalPageCount);
    return {
      pageCount: totalPageCount,
      pages: range(currentPage - siblingCount, lastItem),
    };
  }, [totalCount, pageSize, siblingCount, currentPage]);
};

export default usePagination;
