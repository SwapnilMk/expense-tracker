import React from 'react';
import { Box, Paper } from '@mui/material';
import CategoryPieChart from './charts/CategoryPieChart';
import IncomeExpenseBarChart from './charts/IncomeExpenseBarChart';
import type { TransactionFilters } from '../types';

interface ChartsProps {
  filters: Partial<TransactionFilters>;
}

const Charts: React.FC<ChartsProps> = ({ filters }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
      gap={3}
      mb={4}
    >
      <Paper elevation={3} sx={{ p: 2 }}>
        <CategoryPieChart filters={filters} />
      </Paper>
      <Paper elevation={3} sx={{ p: 2 }}>
        <IncomeExpenseBarChart filters={filters} />
      </Paper>
    </Box>
  );
};

export default Charts;
