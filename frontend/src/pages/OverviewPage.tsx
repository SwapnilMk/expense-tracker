import React, { useState } from "react";
import Summary from "../components/Summary";
import Charts from "../components/Charts";
import FilterControls from "../components/FilterControls";
import type { TransactionFilters } from "../types";
import { Box, Typography, Paper } from "@mui/material";

const OverviewPage: React.FC = () => {
  const [filters, setFilters] = useState<Partial<TransactionFilters>>({});

  const handleFilterChange = (newFilters: Partial<TransactionFilters>) => {
    setFilters(newFilters);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <FilterControls onFilterChange={handleFilterChange} />
      </Paper>

      <Summary filters={filters} />

      <Charts filters={filters} />
    </Box>
  );
};

export default OverviewPage;
