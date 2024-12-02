import React, { useRef } from "react";
import { useMemo } from "react";

import leftArrow2 from "../../assets/image/icon/ic_arr_left_dbl_pagi.svg";
import leftArrow from "../../assets/image/icon/ic_arr_left_pagi.svg";
import rightArrow from "../../assets/image/icon/ic_arr_right_pagi.svg";
import rightArrow2 from "../../assets/image/icon/ic_arr_right_dbl_pagi.svg";

import { convertToArray } from "../../utils/convertData";

const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};
const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
      Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
      Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
      Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const Pagination = (props) => {
  const {
    sizeOption = [10, 20, 30, 50],
    onPageChange,
    onSizeChange,
    realTotalCount,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    hidePagination = false,
  } = props;

  const selectRef = useRef(null);
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = convertToArray(paginationRange)[paginationRange?.length - 1];

  return (
    <div className="foot-record" style={{ ...props.style }}>
      <div className="flex items-center justify-between">
        <div className="show-record">
          <select
            tabIndex={-1}
            ref={selectRef}
            value={pageSize}
            onChange={(e) => {
              onSizeChange(e.target.value);
              selectRef.current.blur();
            }}
          >
            {sizeOption.map((e, idx) => (
              <option key={idx} value={e}>
                {e}
              </option>
            ))}
          </select>

          <span className="toltal-record">{`/${realTotalCount ?? totalCount} bản ghi `}</span>
        </div>
      </div>

      {!hidePagination && (
        <div className="d-flex align-items-center">
          {/* HTML pagination begin */}
          {!(currentPage === 0 || paginationRange.length < 2) && (
            <div id="d_number_of_page" style={{ whiteSpace: "nowrap" }}>
              <button className="btn-pagination" onClick={() => onPageChange(1)}>
                <span id="next">
                  <img src={leftArrow2} alt="" />
                </span>
              </button>
              <button disabled={currentPage === 1} className="btn-pagination" onClick={onPrevious}>
                <span id="next">
                  <img src={leftArrow} alt="" />
                </span>
              </button>
              {paginationRange.map((pageNumber) => {
                if (pageNumber === DOTS) {
                  return <span>&#8230;</span>;
                } else {
                  return (
                    <button className="btn-pagination" onClick={() => onPageChange(pageNumber)}>
                      <span className={`${pageNumber == currentPage ? "active" : ""}`}>
                        {pageNumber}
                      </span>
                    </button>
                  );
                }
              })}
              <button
                disabled={currentPage === lastPage}
                className="btn-pagination"
                onClick={onNext}
              >
                <span id="next">
                  <img src={rightArrow} alt="" />
                </span>
              </button>
              <button className="btn-pagination" onClick={() => onPageChange(lastPage)}>
                <span id="end">
                  <img src={rightArrow2} alt="" />
                </span>
              </button>
            </div>
          )}
          {/* End HTML pagination */}
        </div>
      )}
    </div>
  );
};

export default Pagination;
