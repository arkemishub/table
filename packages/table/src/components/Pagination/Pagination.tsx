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

import { IPaginationProps } from "./Pagination.types";

function Pagination({
  currentPage,
  onChange,
  pages,
  pageCount,
}: IPaginationProps) {
  return (
    <div className="arke__table__pagination">
      <button
        className="arke__table__pagination__button"
        onClick={() => onChange(0)}
        disabled={currentPage === 0}
      >
        «
      </button>
      <button
        className="arke__table__pagination__button"
        onClick={() => onChange(currentPage - 1)}
        disabled={0 > currentPage - 1}
      >
        ‹
      </button>
      {pages?.map((page) => (
        <button
          className={
            page === currentPage
              ? "arke__table__pagination__button arke__table__pagination__button--active"
              : "arke__table__pagination__button"
          }
          key={page}
          onClick={() => onChange(page)}
        >
          {page + 1}
        </button>
      ))}
      <button
        className="arke__table__pagination__button"
        disabled={currentPage + 1 >= pageCount}
        onClick={() => onChange(currentPage + 1)}
      >
        ›
      </button>
      <button
        className="arke__table__pagination__button"
        disabled={currentPage + 1 >= pageCount}
        onClick={() => onChange(pageCount - 1)}
      >
        »
      </button>
    </div>
  );
}

export default Pagination;
