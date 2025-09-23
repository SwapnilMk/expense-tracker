import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import TransactionForm from '../components/TransactionForm';
import { useAddTransactionMutation } from '../features/transactions/transactionApiSlice';
import type { NewTransaction } from '../types';

const AddTransactionPage: React.FC = () => {
  const navigate = useNavigate();
  const [addTransaction, { isLoading }] = useAddTransactionMutation();

  const handleSubmit = async (data: NewTransaction) => {
    try {
      await addTransaction(data).unwrap();
      toast.success('Transaction added successfully!');
      navigate('/transactions');
    } catch {
      toast.error('Failed to add transaction. Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Add New Transaction
      </Typography>
      <TransactionForm onSubmit={handleSubmit} isLoading={isLoading} />
    </Box>
  );
};

export default AddTransactionPage;
