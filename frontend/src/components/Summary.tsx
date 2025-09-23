import React from 'react';
import { Card, CardContent, Typography, Box, CircularProgress, Grid, Avatar } from '@mui/material';
import { useGetSummaryQuery } from '../features/transactions/transactionApiSlice';
import type { TransactionFilters } from '../types';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactElement;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Avatar sx={{ backgroundColor: color, height: 56, width: 56 }}>{icon}</Avatar>
      </Box>
    </CardContent>
  </Card>
);

interface SummaryProps {
  filters: Partial<TransactionFilters>;
}

const Summary: React.FC<SummaryProps> = ({ filters }) => {
  const { data: summary, isLoading, isError } = useGetSummaryQuery(filters);

  if (isLoading) return <CircularProgress />;
  if (isError || !summary) return <Typography color="error">Could not load summary.</Typography>;

  return (
    <Grid container spacing={3}>
      <Grid item lg={4} sm={6} xs={12}>
        <SummaryCard
          title="Total Income"
          value={`₹${summary.totalIncome.toLocaleString()}`}
          icon={<ArrowUpwardIcon />}
          color="success.main"
        />
      </Grid>
      <Grid item lg={4} sm={6} xs={12}>
        <SummaryCard
          title="Total Expenses"
          value={`₹${summary.totalExpenses.toLocaleString()}`}
          icon={<ArrowDownwardIcon />}
          color="error.main"
        />
      </Grid>
      <Grid item lg={4} sm={6} xs={12}>
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
