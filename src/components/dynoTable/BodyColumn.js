import React from "react";
import "./BodyColumn.scss";

export default function BodyColumn({ children, className }) {
  return <div className={`flexChild columnParent BodyColumn ${className}`}>{children}</div>;
}
