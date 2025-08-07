// src/paginationHandlers.js

export function createPaginationHandlers(setPage, setRowsPerPage) {
  const handlePageChange = (e, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  return [handlePageChange, handleRowsPerPageChange];
}
