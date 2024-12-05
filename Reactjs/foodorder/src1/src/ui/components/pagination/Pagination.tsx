import React from 'react';
import { ICONS } from '../../../resources/icons/Icons';
import '../pagination/pagination.css';

import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
interface PaginationProps {
  currentPage: number;
  currentPageData: any[];
  totalPages: number;
  paginate: (pageNumber: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  perPage: number;
  onPerPageChange?: (perPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginate,
  goToNextPage,
  currentPageData,
  goToPrevPage,
  perPage,
  onPerPageChange,
}) => {
  const handlePerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPerPage = parseInt(event.target.value, 10);
    if (onPerPageChange) {
      onPerPageChange(selectedPerPage);
    }
  };

  return (
    <div className="pagination-container">
      {onPerPageChange && (
        <div className="per-page-container">
          <label htmlFor="perPageSelectText">Items in page:</label>
          <select
            id="perPageSelect"
            value={perPage}
            onChange={handlePerPageChange}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <button
            disabled={currentPage === totalPages}
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
          paginate(selected + 1)
        }
        containerClassName="pagination"
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
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

export default Pagination;
