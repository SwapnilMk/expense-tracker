import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Grid, Avatar } from '@mui/material';
import { useGetSummaryQuery } from '../features/transactions/transactionApiSlice';
import type { TransactionFilters } from '../types';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactElement;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
            {value}
          </Typography>
        </Box>
        <Avatar sx={{ backgroundColor: color, height: 56, width: 56 }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

interface SummaryProps {
  filters: Partial<TransactionFilters>;
}

const Summary: React.FC<SummaryProps> = ({ filters }) => {
  const { data: summary, isLoading, isError } = useGetSummaryQuery(filters);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !summary) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error" variant="h6">
          Could not load summary.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: 2 }}>
      {/* Total Income Card */}
      <Grid
        size={{
          xs: 12,  // Full width on mobile
          sm: 6,   // Half width on tablet
          md: 4    // Third width on desktop
        }}
      >
        <SummaryCard
          title="Total Income"
          value={`₹${summary.totalIncome.toLocaleString()}`}
          icon={<ArrowUpwardIcon />}
          color="success.main"
        />
      </Grid>

      {/* Total Expenses Card */}
      <Grid
        size={{
          xs: 12,  // Full width on mobile
          sm: 6,   // Half width on tablet
          md: 4    // Third width on desktop
        }}
      >
        <SummaryCard
          title="Total Expenses"
          value={`₹${summary.totalExpenses.toLocaleString()}`}
          icon={<ArrowDownwardIcon />}
          color="error.main"
        />
      </Grid>

      {/* Balance Card */}
      <Grid
        size={{
          xs: 12,  // Full width on mobile
          sm: 12,  // Full width on tablet
          md: 4    // Third width on desktop
        }}
      >
        <SummaryCard
          title="Balance"
          value={`₹${summary.balance.toLocaleString()}`}
          icon={<AccountBalanceWalletIcon />}
          color="primary.main"
        />
      </Grid>
    </Grid>
  );
};

export default Summary;