import React, { useState, useEffect } from "react";
import "./Pagination.scss";

const PAGING_DIRECTION = {
  NEXT: 1,
  PREV: -1
}

export default function Pagination({ onPaginationChange = () => {}, count = 0 , rowsPerPage = 10}) {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(function() {
    onPaginationChange(currentPage);
  // eslint-disable-next-line
  }, [currentPage]);
  return (
    <div className="Pagination">
      <div>{`Page: ${currentPage}`}</div>
      <button onClick={handleClick(PAGING_DIRECTION.PREV)}>Prev</button>
      <button onClick={handleClick(PAGING_DIRECTION.NEXT)}>Next</button>
    </div>
  );

  function handleClick(direction) {
    return function(_evt) {
      const nextPage = currentPage + direction;
      if (nextPage <= 0 || nextPage >= getMaxPages()) {
        setCurrentPage(currentPage);
      } else {
        setCurrentPage(nextPage)
      }
    }
  }

  function getMaxPages() {
    return Math.floor(count / rowsPerPage);
  }
}
