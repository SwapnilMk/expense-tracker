import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetSummaryQuery } from '../../features/transactions/transactionApiSlice';
import { Box, Typography, CircularProgress } from '@mui/material';
import type { TransactionFilters } from '../../types';

interface ChartProps {
  filters: Partial<TransactionFilters>;
}

const NoDataDisplay = () => (
    <Box display="flex" justifyContent="center" alignItems="center" height={300}>
        <Typography variant="body1" color="text.secondary">
            No summary data to display.
        </Typography>
    </Box>
);

const IncomeExpenseBarChart: React.FC<ChartProps> = ({ filters }) => {
  const { data: summary, isLoading, isError } = useGetSummaryQuery(filters);

  if (isLoading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height={300}><CircularProgress /></Box>;
  }

  if (isError) {
    return <Typography>Could not load summary data for chart.</Typography>;
  }

  if (!summary || (summary.totalIncome === 0 && summary.totalExpenses === 0)) {
      return <NoDataDisplay />;
  }

  const chartData = [
    {
      type: 'Income',
      amount: summary.totalIncome,
    },
    {
      type: 'Expenses',
      amount: summary.totalExpenses,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Income vs. Expenses</Typography>
      <BarChart
        dataset={chartData}
        xAxis={[{ scaleType: 'band', dataKey: 'type' }]}
        series={[{ dataKey: 'amount', label: 'Amount', color: '#4caf50' }]}
        height={300}
        colors={['#2e7d32', '#c62828']}
      />
    </Box>
  );
};

export default IncomeExpenseBarChart;
