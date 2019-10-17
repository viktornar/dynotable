import React, { memo } from "react";
import "./BodyColumn.scss";

function BodyColumn({ children, className }) {
  return (
    <div className={`flexChild columnParent BodyColumn ${className}`}>
      {children}
    </div>
  );
}

export default memo(BodyColumn);
