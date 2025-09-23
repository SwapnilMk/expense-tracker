import React from 'react';
import { Grid, Card, CardContent, Box, Typography } from '@mui/material';
import CategoryPieChart from './charts/CategoryPieChart';
import IncomeExpenseBarChart from './charts/IncomeExpenseBarChart';
import type { TransactionFilters } from '../types';

interface ChartsProps {
  filters: Partial<TransactionFilters>;
}

const Charts: React.FC<ChartsProps> = ({ filters }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Grid
        container
        spacing={{ xs: 1.5, sm: 2, md: 3 }}
        rowSpacing={{ xs: 2, sm: 1 }}
        sx={{
          // Ensure equal height cards on desktop/tablet
          '& .MuiGrid-item': {
            display: 'flex'
          }
        }}
      >
        {/* Income/Expense Bar Chart - Left/Top */}
        <Grid
          size={{
            xs: 12,  // Full width on mobile
            sm: 12,  // Full width on tablet
            md: 6    // Half width on desktop
          }}
        >
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: { xs: 2, sm: 3 } // Responsive padding
            }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                Income vs Expenses
              </Typography>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IncomeExpenseBarChart filters={filters} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Category Pie Chart - Right/Bottom */}
        <Grid
          size={{
            xs: 12,  // Full width on mobile
            sm: 12,  // Full width on tablet
            md: 6    // Half width on desktop
          }}
        >
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: { xs: 2, sm: 3 } // Responsive padding
            }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  color: 'text.primary'
                }}
              >
                Expense Categories
              </Typography>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CategoryPieChart filters={filters} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Charts;