import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>
      <div className="page-info">Страница {currentPage} из {totalPages}</div>
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Вперед
      </button>
    </div>
  );
};

export default Pagination;