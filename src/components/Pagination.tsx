import React from 'react';
import '@/styles/pagination.scss';

interface PaginationProps {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasNext,
  hasPrevious,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
      >
        Previous
      </button>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
