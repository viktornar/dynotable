import React, { useState, useEffect } from "react";

export default function Settings({ onSettingsChange = () => {} }) {
  const [isPagination, setIsPagination] = useState(false);

  useEffect(
    function() {
      onSettingsChange({ isPagination });
      // eslint-disable-next-line
    },
    [isPagination]
  );

  return (
    <div>
      <button onClick={() => {}}>Switch to ...</button>
    </div>
  );

  function handleClick() {
    setIsPagination(!isPagination);
  }
}
