import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div>
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next"
      >
        Next
      </button>
    </div>
  );
};
