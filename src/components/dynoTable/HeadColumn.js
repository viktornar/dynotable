import React from "react";
import "./HeadColumn.scss";

export default function HeadColumn({ children }) {
  return <div className="flexChild parentColumn HeadColumn">{children}</div>;
}
