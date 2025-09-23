import React from 'react';
import { Grid, Card, CardContent, Box } from '@mui/material';
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
          '& .MuiGrid-item': {
            display: 'flex'
          }
        }}
      >
        <Grid
          size={{
            xs: 12,  
            sm: 12,  
            md: 6    
          }}
        >
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: { xs: 2, sm: 3 } 
            }}>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IncomeExpenseBarChart filters={filters} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

      
        <Grid
          size={{
            xs: 12, 
            sm: 12,  
            md: 6 
          }}
        >
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: { xs: 2, sm: 3 }
            }}>
            
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