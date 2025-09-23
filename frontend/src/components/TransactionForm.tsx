import React, { useEffect } from "react";
import { Box, Button, TextField, MenuItem, Paper, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { NewTransaction, Transaction } from "../types";

interface TransactionFormProps {
  onSubmit: (data: NewTransaction, id?: string) => void;
  transaction?: Transaction | null;
  isLoading?: boolean;
}

const categories = {
  income: ["salary", "bonus", "investment", "other_income"],
  expense: [
    "groceries", "transport", "entertainment", "utilities", "medical",
    "shopping", "dining", "rent", "other_expense"
  ],
};

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, transaction, isLoading }) => {
  const { control, handleSubmit, reset, watch } = useForm<NewTransaction>({
    defaultValues: {
      type: "expense",
      amount: 0,
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const selectedType = watch("type");

  useEffect(() => {
    if (transaction) {
      reset({
        ...transaction,
        date: new Date(transaction.date).toISOString().split("T")[0],
      });
    }
  }, [transaction, reset]);

  const handleFormSubmit: SubmitHandler<NewTransaction> = (data) => {
    onSubmit(data, transaction?.id);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>{transaction ? 'Edit' : 'Create'} Transaction</Typography>
      <Box display="grid" gap={2}>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Type" fullWidth>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </TextField>
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Category" fullWidth>
              {categories[selectedType].map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Amount" type="number" fullWidth />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Description" fullWidth multiline rows={3} />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Date" type="date" fullWidth InputLabelProps={{ shrink: true }}/>
          )}
        />
        <Button type="submit" variant="contained" color="primary" size="large" disabled={isLoading}>
          {isLoading ? 'Submitting...' : (transaction ? "Save Changes" : "Add Transaction")}
        </Button>
      </Box>
    </Paper>
  );
};

export default TransactionForm;
