import React, { useState } from "react";
import { Box, Typography, Snackbar, Alert, Paper } from "@mui/material";
import FilterControls from "../components/FilterControls";
import TransactionList from "../components/TransactionList";
import TransactionModal from "../components/TransactionModal";
import {
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} from "../features/transactions/transactionApiSlice";
import type { NewTransaction, Transaction, TransactionFilters } from "../types";

const TransactionsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState<Partial<TransactionFilters>>({});
  const [notification, setNotification] = useState<{ message: string; severity: "success" | "error" } | null>(null);

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
      setNotification({ message: "Transaction updated successfully!", severity: "success" });
      handleCloseModal();
    } catch (error) {
      setNotification({ message: "An error occurred while updating.", severity: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    if(window.confirm("Are you sure you want to delete this transaction?")) {
        try {
            await deleteTransaction(id).unwrap();
            setNotification({ message: "Transaction deleted successfully!", severity: "success" });
        } catch (error) {
            setNotification({ message: "Failed to delete transaction.", severity: "error" });
        }
    }
  }

  const handleFilterChange = (newFilters: Partial<TransactionFilters>) => {
    setFilters(newFilters);
  };

  return (
    <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>Transaction History</Typography>
        <Paper sx={{ p: 2, mb: 3 }}>
            <FilterControls onFilterChange={handleFilterChange} />
        </Paper>
        <TransactionList filters={filters} onEdit={handleOpenEditModal} onDelete={handleDelete} />
        <TransactionModal
            open={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleEditSubmit}
            transaction={editingTransaction}
        />
        <Snackbar open={!!notification} autoHideDuration={6000} onClose={() => setNotification(null)}>
            <Alert onClose={() => setNotification(null)} severity={notification?.severity} sx={{ width: '100%' }}>
            {notification?.message}
            </Alert>
        </Snackbar>
    </Box>
  );
};

export default TransactionsPage;
