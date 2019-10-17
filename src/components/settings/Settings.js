import React, { useState, useEffect } from "react";
import "./Settings.scss";

export default function Settings({ onSettingsChange = () => {} }) {
  const [isPagination, setIsPagination] = useState(false);

  useEffect(
    function() {
      onSettingsChange({ isPagination });
    },
    // eslint-disable-next-line
    [isPagination]
  );

  return (
    <div className="Settings">
      <button onClick={handleClick}>{`Switch to ${
        isPagination ? "full view" : "pages"
      }`}</button>
    </div>
  );

  function handleClick() {
    setIsPagination(!isPagination);
  }
}
