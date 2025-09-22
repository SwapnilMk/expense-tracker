export const formatTransaction = (transaction) => {
  return {
    id: transaction._id,
    type: transaction.type,
    amount: parseFloat(transaction.amount.toFixed(2)),
    description: transaction.description,
    category: transaction.category,
    date: transaction.date.toISOString().split("T")[0],
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };
};

// Calculate percentage for category
export const calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return parseFloat(((part / total) * 100).toFixed(2));
};
