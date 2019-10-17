import React from "react";

export default function BodyRow({children, onRowClick = () => {} }) {
  return <div className="flexChild rowParent" onClick={handleClick}>{children}</div>;

  function handleClick(evt) {
    onRowClick(evt);
  }
}
