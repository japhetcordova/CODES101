// src/useSortedStudents.js
import { useMemo } from 'react';

export function useSortedStudents(students, sortBy, sortDirection, page, rowsPerPage) {
  const sortedStudents = useMemo(() => {
    const sorted = [...students];
    sorted.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [students, sortBy, sortDirection]);

  const pagedStudents = useMemo(() =>
    sortedStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedStudents, page, rowsPerPage]
  );

  return { sortedStudents, pagedStudents };
}
