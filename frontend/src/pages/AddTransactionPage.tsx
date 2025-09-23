import React, { useState } from 'react';
import { Container, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';
import { useAddTransactionMutation } from '../features/transactions/transactionApiSlice';
import type { NewTransaction } from '../types';

import { Typography } from '@mui/material';

const AddTransactionPage: React.FC = () => {
  const navigate = useNavigate();
  const [addTransaction, { isLoading }] = useAddTransactionMutation();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: NewTransaction) => {
    try {
      await addTransaction(data).unwrap();
      navigate('/transactions');
    } catch (err) {
      setError('Failed to add transaction. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
        Add New Transaction
      </Typography>
      <TransactionForm onSubmit={handleSubmit} isLoading={isLoading} />
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddTransactionPage;
