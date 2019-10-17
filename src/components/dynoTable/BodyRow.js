import React from "react";

export default function BodyRow({itemId, children, onRowClick = () => {} }) {
  return <div className="flexChild rowParent" onClick={handleClick}>{children}</div>;

  function handleClick(_evt) {
    onRowClick(itemId);
  }
}
