import React, { useState, useEffect } from "react";
import clsx from "classnames";
import "./HeadColumn.scss";

export const SORT_ORDER = {
  NONE: 0,
  ASC: 1,
  DESC: -1
};

export default function HeadColumn({ children, onSortChange = () => {} }) {
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.NONE);

  useEffect(() => {
    if (sortOrder !== SORT_ORDER.NONE) {
      onSortChange(sortOrder);
    }
  }, [sortOrder]);
  
  return (
    <div
      className={clsx("flexChild", "parentColumn", "HeadColumn", {
        "HeadColumn--asc": sortOrder === SORT_ORDER.ASC,
        "HeadColumn--desc": sortOrder === SORT_ORDER.DESC
      })}
      onClick={handleClick}
    >
      {children}
    </div>
  );

  function handleClick(_evt) {
    switch (sortOrder) {
      case SORT_ORDER.NONE:
        setSortOrder(SORT_ORDER.ASC);
        break;
      case SORT_ORDER.ASC:
        setSortOrder(SORT_ORDER.DESC);
        break;
      case SORT_ORDER.DESC:
        setSortOrder(SORT_ORDER.ASC);
        break;
      default:
        setSortOrder(SORT_ORDER.NONE);
    }
  }
}
