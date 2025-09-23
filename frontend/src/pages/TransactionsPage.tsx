import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import FilterControls from '../components/FilterControls';
import TransactionList from '../components/TransactionList';
import TransactionModal from '../components/TransactionModal';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import {
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} from '../features/transactions/transactionApiSlice';
import type { NewTransaction, Transaction, TransactionFilters } from '../types';

const TransactionsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filters, setFilters] = useState<Partial<TransactionFilters>>({});

  const [updateTransaction] = useUpdateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleOpenEditModal = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTransaction(null);
  };

  const handleEditSubmit = async (data: NewTransaction, id?: string) => {
    if (!id) return;
    try {
      await updateTransaction({ ...data, id }).unwrap();
      toast.success('Transaction updated successfully!');
      handleCloseModal();
    } catch {
      toast.error('An error occurred while updating.');
    }
  };

  const handleOpenDeleteDialog = (id: string) => {
    setDeletingId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeletingId(null);
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
      await deleteTransaction(deletingId).unwrap();
      toast.success('Transaction deleted successfully!');
      handleCloseDeleteDialog();
    } catch {
      toast.error('Failed to delete transaction.');
      handleCloseDeleteDialog();
    }
  };

  const handleFilterChange = (newFilters: Partial<TransactionFilters>) => {
    setFilters(newFilters);
  };

  return (
      <Box>
        <Typography
          variant="h4"
          sx={{
            mb: { xs: 2, md: 3 },
            fontWeight: 'bold',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Transaction History
        </Typography>

        <FilterControls onFilterChange={handleFilterChange} />

        <TransactionList
          filters={filters}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteDialog}
        />

        <TransactionModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleEditSubmit}
          transaction={editingTransaction}
        />

        <DeleteConfirmationDialog
          open={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onConfirm={handleDeleteConfirm}
          title="Delete Transaction"
          description="Are you sure you want to delete this transaction? This action cannot be undone."
        />
      </Box>
  );
};

export default TransactionsPage;