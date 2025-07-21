import React from 'react';

const TableHeader = ({ 
  columns, 
  sortConfig, 
  onSort, 
  onResize, 
  columnWidths 
}) => {
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th 
            key={column.key}
            style={{ width: columnWidths[column.key] }}
            onClick={() => onSort(column.key)}
          >
            {column.label}
            {sortConfig.key === column.key && (
              <span className="sort-indicator">
                {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
              </span>
            )}
            <div 
              className="resize-handle"
              onMouseDown={(e) => onResize(column.key, e)}
            ></div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;