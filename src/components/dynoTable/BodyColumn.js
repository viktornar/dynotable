import React from "react";
import "./BodyColumn.scss";

export default function BodyColumn({ children }) {
  return <div className="flexChild columnParent BodyColumn">{children}</div>;
}
