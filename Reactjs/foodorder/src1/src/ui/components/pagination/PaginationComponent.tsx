import React, { useState, useEffect } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import './pagination.css';
import ReactPaginate from 'react-paginate';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  handleItemsPerPageChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  handleItemsPerPageChange,
}) => {
  return (
    <div className="pagination-container">
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <button
            disabled={totalPages <= currentPage}
            className={currentPage === totalPages ? 'disabled' : 'current-btn'}
          >
            <MdArrowForwardIos
              style={{
                color: currentPage === totalPages ? '#d9d9d9' : '#667085',
                fontSize: '.9rem',
              }}
            />
          </button>
        }
        onPageChange={({ selected }: { selected: number }) =>
          onPageChange(selected + 1)
        }
        containerClassName="pagination"
        pageRangeDisplayed={3}
        forcePage={currentPage - 1}
        pageClassName="current-btn"
        pageCount={totalPages}
        activeClassName="active-page"
        previousLabel={
          <button
            className={currentPage === 1 ? 'disabled' : 'current-btn'}
            disabled={currentPage === 1}
          >
            <MdArrowBackIos
              style={{
                color: currentPage === 1 ? '#d9d9d9' : '#667085',
                fontSize: '.9rem',
                marginLeft: '.2rem',
              }}
            />
          </button>
        }
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default PaginationComponent;
