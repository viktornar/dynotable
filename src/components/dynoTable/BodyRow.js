import React, { memo } from "react";

function BodyRow({ children, onRowClick = () => {} }) {
  return (
    <div className="flexChild rowParent" onClick={handleClick}>
      {children}
    </div>
  );

  function handleClick(evt) {
    onRowClick(evt);
  }
}

export default memo(BodyRow);
