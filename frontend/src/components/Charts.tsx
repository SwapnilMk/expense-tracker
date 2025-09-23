import React from 'react';
import { Grid, Card, CardHeader, CardContent, Box } from '@mui/material';
import CategoryPieChart from './charts/CategoryPieChart';
import IncomeExpenseBarChart from './charts/IncomeExpenseBarChart';
import type { TransactionFilters } from '../types';

interface ChartsProps {
  filters: Partial<TransactionFilters>;
}

const Charts: React.FC<ChartsProps> = ({ filters }) => {
  return (
    <Box>
        {/* Income vs Expense */}
        <Grid >
          <Card>
            <CardHeader title="Income vs Expense" />
            <CardContent>
              <IncomeExpenseBarChart filters={filters} />
            </CardContent>
          </Card>
        </Grid>

        {/* Expense by Category */}
        <Grid>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Expense by Category" />
            <CardContent>
              <CategoryPieChart filters={filters} />
            </CardContent>
          </Card>
        </Grid>
    </Box>
  );
};

export default Charts;
