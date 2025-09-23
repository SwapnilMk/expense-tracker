import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { TransactionFilters } from "../types";

interface FilterControlsProps {
  onFilterChange: (filters: Partial<TransactionFilters>) => void;
}

const categories = [
  "salary", "bonus", "investment", "other_income", "groceries", "transport",
  "entertainment", "utilities", "medical", "shopping", "dining", "rent", "other_expense"
];

const FilterControls: React.FC<FilterControlsProps> = ({ onFilterChange }) => {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleApplyFilters = () => {
    const filters: Partial<TransactionFilters> = {};
    if (type) filters.type = type as "income" | "expense";
    if (category) filters.category = category;
    if (startDate) filters.startDate = startDate.toISOString();
    if (endDate) filters.endDate = endDate.toISOString();
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setType("");
    setCategory("");
    setStartDate(null);
    setEndDate(null);
    onFilterChange({});
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
      <Box
        display="grid"
        gap={2}
        alignItems="center"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "2fr 3fr 2fr 2fr 3fr",
        }}
      >
        <TextField
          select
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
        >
          <MenuItem value=""><em>All</em></MenuItem>
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </TextField>
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
        >
          <MenuItem value=""><em>All</em></MenuItem>
          {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={setEndDate}
        />
        <Box display="flex" gap={1}>
          <Button variant="contained" onClick={handleApplyFilters} fullWidth>Apply</Button>
          <Button variant="outlined" onClick={handleClearFilters} fullWidth>Clear</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FilterControls;
