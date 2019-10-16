import React from 'react'

export default function TableColumn({ children }) {
  return (
    <div className="flexChild columnParent">
      {children}
    </div>
  )
}
