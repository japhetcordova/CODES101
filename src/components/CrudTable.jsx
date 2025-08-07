import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button
} from '@mui/material';



export default function CrudTable({
  columns,
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  selectedId,
  onRowClick,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [sortBy, setSortBy] = React.useState(columns[0]?.accessor || '');
  const [sortDirection, setSortDirection] = React.useState('asc');
  const [search, setSearch] = React.useState('');
  const longPressTimeout = React.useRef();

  // Keyboard delete handler
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Backspace' || e.key === 'Delete') && selectedId) {
        const row = data.find(r => r.id === selectedId);
        if (row) onDelete(row);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, data, onDelete]);

  const handleRowTouchStart = (row) => {
    longPressTimeout.current = setTimeout(() => {
      onDelete(row);
    }, 600); // 600ms for long press
  };
  const handleRowTouchEnd = () => {
    clearTimeout(longPressTimeout.current);
  };

  const handleSort = accessor => {
    if (sortBy === accessor) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(accessor);
      setSortDirection('asc');
    }
  };

  const filteredData = React.useMemo(() => {
    if (!search) return data;
    const lower = search.toLowerCase();
    return data.filter(row =>
      columns.some(col =>
        String(row[col.accessor] ?? '').toLowerCase().includes(lower)
      )
    );
  }, [data, columns, search]);

  const sortedData = React.useMemo(() => {
    const sorted = [...filteredData];
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
  }, [filteredData, sortBy, sortDirection]);

  const pagedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className='flex items-center justify-between'>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginRight: 16, padding: 4, flex: 1, maxWidth: 300 }}
        />
        <Button variant="outlined" color="primary" onClick={onAdd}>+</Button>
      
      </div>
      <TableContainer component={Paper} style={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            
            <TableRow>
              {columns.map(col => (
                <TableCell
                  key={col.accessor}
                  onClick={() => handleSort(col.accessor)}
                  sx={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  <strong>{col.label}</strong>
                  {sortBy === col.accessor ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedData.map((row) => (
              <TableRow
                key={row.id}
                hover
                onClick={() => onRowClick && onRowClick(row)}
                onDoubleClick={() => onEdit(row)}
                onTouchStart={() => handleRowTouchStart(row)}
                onTouchEnd={handleRowTouchEnd}
                selected={selectedId === row.id}
                sx={{ cursor: 'pointer' }}
              >
                {columns.map(col => (
                  <TableCell key={col.accessor}>{row[col.accessor]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </>
  );
}