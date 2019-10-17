import React, { memo } from "react";

function BodyRow({ children, onRowClick = () => {}, className = "" }) {
  return (
    <div className={`flexChild rowParent ${className}`} onClick={handleClick}>
      {children}
    </div>
  );

  function handleClick(evt) {
    onRowClick(evt);
  }
}

export default memo(BodyRow);
