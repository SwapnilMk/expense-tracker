import React, { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Summary from "../components/Summary";
import Charts from "../components/Charts";
import type { TransactionFilters } from "../types";

const OverviewPage: React.FC = () => {
  const [filters] = useState<Partial<TransactionFilters>>({});

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Overview
      </Typography>

      <Box>
        {/* Summary full width */}
        <Box>
          <Summary filters={filters} />
        </Box>

        {/* Charts full width so they align under summary */}
        <Grid sx={{ mt: 4 }}>
          <Charts filters={filters} />
        </Grid>
      </Box>
    </Box>
  );
};

export default OverviewPage;
