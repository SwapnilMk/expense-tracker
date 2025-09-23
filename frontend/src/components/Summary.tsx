import React from "react";
import { Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import { useGetSummaryQuery } from "../features/transactions/transactionApiSlice";
import type { TransactionFilters } from "../types";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

interface SummaryProps {
  filters: Partial<TransactionFilters>;
}

const Summary: React.FC<SummaryProps> = ({ filters }) => {
  const { data: summary, isLoading, isError } = useGetSummaryQuery(filters);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !summary) {
    return <Typography color="error">Could not load summary.</Typography>;
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", sm: "repeat(3, 1fr)" }}
      gap={3}
      mb={4}
    >
      <Card sx={{ backgroundColor: "#e8f5e9", color: "#2e7d32" }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <ArrowUpwardIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Total Income</Typography>
          </Box>
          <Typography variant="h4" component="p">
            ${summary.totalIncome.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ backgroundColor: "#ffebee", color: "#c62828" }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <ArrowDownwardIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Total Expenses</Typography>
          </Box>
          <Typography variant="h4" component="p">
            ${summary.totalExpenses.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ backgroundColor: "#e3f2fd", color: "#1565c0" }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <AccountBalanceWalletIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Balance</Typography>
          </Box>
          <Typography variant="h4" component="p">
            ${summary.balance.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Summary;
