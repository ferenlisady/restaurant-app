import { useState } from "react";

function usePagination<T>(items: T[], itemsPerPage: number) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return {
    paginatedItems,
    page,
    setPage: handlePageChange,
    totalPages,
  };
}

export default usePagination;
