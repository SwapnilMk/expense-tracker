import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import TransactionForm from "./TransactionForm";
import type { NewTransaction, Transaction } from "../types";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewTransaction, id?: string) => void;
  transaction: Transaction | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  open,
  onClose,
  onSubmit,
  transaction,
}) => {
  if (!transaction) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <TransactionForm onSubmit={onSubmit} transaction={transaction} />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
