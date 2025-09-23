import React, { useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Paper, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { NewTransaction, Transaction } from '../types';

interface TransactionFormProps {
  onSubmit: (data: NewTransaction, id?: string) => void;
  transaction?: Transaction | null;
  isLoading?: boolean;
}

const categories = {
  income: ['Salary', 'Bonus', 'Investment', 'Other Income'],
  expense: [
    'Groceries',
    'Transport',
    'Entertainment',
    'Utilities',
    'Medical',
    'Shopping',
    'Dining',
    'Rent',
    'Other Expense',
  ],
};

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, transaction, isLoading }) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<NewTransaction>({
    defaultValues: {
      type: 'expense',
      amount: 0,
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  const selectedType = watch('type');

  useEffect(() => {
    if (transaction) {
      reset({
        ...transaction,
        date: new Date(transaction.date).toISOString().split('T')[0],
      });
    } else {
      reset({
        type: 'expense',
        amount: 0,
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [transaction, reset]);

  const handleFormSubmit: SubmitHandler<NewTransaction> = (data) => {
    onSubmit(data, transaction?.id);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        {transaction ? 'Edit' : 'Create'} Transaction
      </Typography>
      <Box display="grid" gap={2}>
        <Controller
          name="type"
          control={control}
          rules={{ required: 'Type is required' }}
          render={({ field }) => (
            <TextField {...field} select label="Type" fullWidth error={!!errors.type} helperText={errors.type?.message}>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>
          )}
        />
        <Controller
          name="category"
          control={control}
          rules={{ required: 'Category is required' }}
          render={({ field }) => (
            <TextField {...field} select label="Category" fullWidth error={!!errors.category} helperText={errors.category?.message}>
              {categories[selectedType].map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="amount"
          control={control}
          rules={{
            required: 'Amount is required',
            valueAsNumber: true,
            validate: (value) => value > 0 || 'Amount must be greater than 0',
          }}
          render={({ field }) => (
            <TextField {...field} label="Amount" type="number" fullWidth error={!!errors.amount} helperText={errors.amount?.message} />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: 'Description is required' }}
          render={({ field }) => (
            <TextField {...field} label="Description" fullWidth multiline rows={3} error={!!errors.description} helperText={errors.description?.message} />
          )}
        />
        <Controller
          name="date"
          control={control}
          rules={{ required: 'Date is required' }}
          render={({ field }) => (
            <TextField {...field} label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }} error={!!errors.date} helperText={errors.date?.message} />
          )}
        />
        <Button type="submit" variant="contained" color="primary" size="large" disabled={isLoading}>
          {isLoading ? 'Submitting...' : transaction ? 'Save Changes' : 'Add Transaction'}
        </Button>
      </Box>
    </Paper>
  );
};

export default TransactionForm;
