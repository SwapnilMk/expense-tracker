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

  const queryFilters = { ...filters, page: page + 1, limit: rowsPerPage, sortBy: orderBy, order };
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

  if (isLoading) return <CircularProgress />;
  if (isError || !data) return <Typography color="error">Could not load transactions.</Typography>;

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
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
          sx={{ flexGrow: 1, minWidth: '200px' }}
        />
        <TextField
          select
          label="Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {allCategories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
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
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow hover key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Typography color={transaction.type === 'income' ? 'primary' : 'error'}>
                    {transaction.type}
                  </Typography>
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell align="right">₹{transaction.amount.toLocaleString()}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => onEdit(transaction)} size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(transaction.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      />
    </Paper>
  );
};

export default TransactionList;
