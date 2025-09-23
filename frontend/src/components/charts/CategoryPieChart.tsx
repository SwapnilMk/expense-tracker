import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useGetCategoryBreakdownQuery } from "../../features/transactions/transactionApiSlice";
import { Box, Typography, CircularProgress } from "@mui/material";
import type { TransactionFilters } from "../../types";

interface ChartProps {
  filters: Partial<TransactionFilters>;
}

const NoDataDisplay = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height={200}>
    <Typography variant="body1" color="text.secondary">
      No expense data to display.
    </Typography>
  </Box>
);

const CategoryPieChart: React.FC<ChartProps> = ({ filters }) => {
  const { data, isLoading, isError } = useGetCategoryBreakdownQuery({
    ...filters,
    type: "expense",
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Typography color="error">Could not load chart data.</Typography>;
  }

  const expenseData = data?.find((d) => d.type === "expense");

  if (!expenseData || expenseData.categories.length === 0) {
    return <NoDataDisplay />;
  }

  const chartData = expenseData.categories.map((cat, index) => ({
    id: index,
    value: cat.total,
    label: cat.category,
  }));

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Expense Breakdown
      </Typography>
      <PieChart
        series={[
          {
            data: chartData,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 2,
            cornerRadius: 5,
          },
        ]}
        height={450}
      />
    </Box>
  );
};

export default CategoryPieChart;
