import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
  Box,
  Typography,
  TablePagination,
  TableSortLabel,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useGetTransactionsQuery } from '../features/transactions/transactionApiSlice';
import type { Transaction, TransactionFilters } from '../types';

type Order = 'asc' | 'desc';
type SortableKeys = keyof Transaction;

interface HeadCell {
  id: SortableKeys;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'date', numeric: false, label: 'Date' },
  { id: 'type', numeric: false, label: 'Type' },
  { id: 'category', numeric: false, label: 'Category' },
  { id: 'description', numeric: false, label: 'Description' },
  { id: 'amount', numeric: true, label: 'Amount' },
];

interface TransactionListProps {
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  filters: Partial<TransactionFilters>;
}

const TransactionList: React.FC<TransactionListProps> = ({ onEdit, onDelete, filters }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<SortableKeys>('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const queryFilters = {
    ...filters,
    page: page + 1,
    limit: rowsPerPage,
    sortBy: orderBy,
    order
  };

  const { data, isLoading, isError } = useGetTransactionsQuery(queryFilters);

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: SortableKeys) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredTransactions = useMemo(() => {
    if (!data?.transactions) return [];
    let transactions = data.transactions;
    if (searchTerm) {
      transactions = transactions.filter((t) =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter) {
      transactions = transactions.filter((t) => t.category === categoryFilter);
    }
    return transactions;
  }, [data, searchTerm, categoryFilter]);

  const allCategories = useMemo(() => {
    if (!data?.transactions) return [];
    return [...new Set(data.transactions.map((t) => t.category))];
  }, [data]);

  // Mobile-friendly transaction card
  const MobileTransactionCard = ({ transaction }: { transaction: Transaction }) => (
    <Card sx={{ mb: 1.5, p: 2 }}>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Box>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
              {transaction.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(transaction.date).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: transaction.type === 'income' ? 'success.main' : 'error.main'
            }}
          >
            ₹{transaction.amount.toLocaleString()}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          <Chip
            label={transaction.type}
            size="small"
            color={transaction.type === 'income' ? 'success' : 'error'}
            variant="outlined"
          />
          <Chip label={transaction.category} size="small" variant="outlined" />
        </Stack>
        <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Tooltip title="Edit">
            <IconButton onClick={() => onEdit(transaction)} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(transaction.id)} size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <Typography color="error" variant="h6">
          Could not load transactions.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper sx={{
      p: { xs: 1.5, sm: 2 },
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100%'
    }}>
      {/* Search and Filter Controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 },
          alignItems: { xs: 'stretch', sm: 'center' }
        }}
      >
        <TextField
          placeholder="Search Description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
            minWidth: { xs: '100%', sm: '200px' },
            maxWidth: { xs: '100%', sm: '300px' }
          }}
          size="small"
        />
        <TextField
          select
          label="Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{
            minWidth: { xs: '100%', sm: 150 },
            maxWidth: { xs: '100%', sm: 200 }
          }}
          size="small"
        >
          <MenuItem value="">All Categories</MenuItem>
          {allCategories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Mobile Cards or Desktop Table */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {filteredTransactions.map((transaction) => (
          <MobileTransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </Box>

      {/* Desktop Table */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <TableContainer sx={{ maxHeight: 600, overflow: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    sx={{
                      minWidth: headCell.id === 'description' ? 150 : 100,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell align="center" sx={{ minWidth: 100 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow hover key={transaction.id}>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.type}
                      size="small"
                      color={transaction.type === 'income' ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{transaction.category}</TableCell>
                  <TableCell sx={{ maxWidth: 200 }}>
                    <Tooltip title={transaction.description}>
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          display: 'block'
                        }}
                      >
                        {transaction.description}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    ₹{transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => onEdit(transaction)} size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => onDelete(transaction.id)} size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          showFirstButton
          showLastButton
          sx={{
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: '0.875rem'
            }
          }}
        />
      </Box>
    </Paper>
  );
};

export default TransactionList;