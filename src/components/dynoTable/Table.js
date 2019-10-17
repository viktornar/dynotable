import React from "react";
import Pagination from "./Pagination";
import "./Table.scss";

export default function Table({
  children,
  isPagination,
  onPaginationChange,
  count,
  rowsPerPage
}) {
  return (
    <div className="Table">
      {children}
      {isPagination && (
        <Pagination
          onPaginationChange={onPaginationChange}
          count={count}
          rowsPerPage={rowsPerPage}
        />
      )}
    </div>
  );
}
