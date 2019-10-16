import React from 'react';
import './TableHead.scss';

export default function TableHead({children}) {
  return (
    <div className="flexContainer TableHead">
      {children}
    </div>
  )
}
