import Transaction from "../models/transaction.model.js";
import {
  formatTransaction,
  calculatePercentage,
} from "../utils/transaction.utils.js";

// ✅ Create new transaction
export const createTransactionService = async (transactionData) => {
  try {
    validateBusinessRules(transactionData);

    const transaction = new Transaction(transactionData);
    await transaction.save();

    return formatTransaction(transaction);
  } catch (error) {
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      throw new Error(firstError.message);
    }
    throw new Error(`Failed to create transaction: ${error.message}`);
  }
};

// ✅ Get all transactions
export const getTransactionsService = async (filters = {}) => {
  try {
    const query = buildQuery(filters);
    const skip = (filters.page - 1) * filters.limit;

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(filters.limit)
      .lean();

    const total = await Transaction.countDocuments(query);
    const summary = await calculateSummaryService(query);

    const formattedTransactions = transactions.map(formatTransaction);

    return {
      transactions: formattedTransactions,
      total,
      summary,
    };
  } catch (error) {
    throw new Error(`Failed to fetch transactions: ${error.message}`);
  }
};

// ✅ Get single transaction by ID
export const getTransactionByIdService = async (id) => {
  try {
    const transaction = await Transaction.findById(id).lean();
    if (!transaction) throw new Error("Transaction not found");

    return formatTransaction(transaction);
  } catch (error) {
    if (error.name === "CastError") throw new Error("Invalid transaction ID");
    throw new Error(`Failed to fetch transaction: ${error.message}`);
  }
};

// ✅ Update transaction
export const updateTransactionService = async (id, updateData) => {
  try {
    validateBusinessRules(updateData);

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true, lean: true },
    );

    if (!transaction) throw new Error("Transaction not found");

    return formatTransaction(transaction);
  } catch (error) {
    if (error.name === "CastError") throw new Error("Invalid transaction ID");
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      throw new Error(firstError.message);
    }
    throw new Error(`Failed to update transaction: ${error.message}`);
  }
};

// ✅ Delete transaction
export const deleteTransactionService = async (id) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) throw new Error("Transaction not found");

    return { id: transaction._id, message: "Transaction deleted successfully" };
  } catch (error) {
    if (error.name === "CastError") throw new Error("Invalid transaction ID");
    throw new Error(`Failed to delete transaction: ${error.message}`);
  }
};

// ✅ Calculate summary
export const calculateSummaryService = async (query = {}) => {
  try {
    const baseQuery = Object.keys(query).length === 0 ? {} : query;

    const pipeline = [
      { $match: baseQuery },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          income: {
            $sum: { $cond: [{ $eq: ["$_id", "income"] }, "$total", 0] },
          },
          expenses: {
            $sum: { $cond: [{ $eq: ["$_id", "expense"] }, "$total", 0] },
          },
          incomeCount: {
            $sum: { $cond: [{ $eq: ["$_id", "income"] }, "$count", 0] },
          },
          expenseCount: {
            $sum: { $cond: [{ $eq: ["$_id", "expense"] }, "$count", 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalIncome: { $round: ["$income", 2] },
          totalExpenses: { $round: ["$expenses", 2] },
          balance: { $round: [{ $subtract: ["$income", "$expenses"] }, 2] },
          incomeCount: 1,
          expenseCount: 1,
        },
      },
    ];

    const result = await Transaction.aggregate(pipeline);
    return (
      result[0] || {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        incomeCount: 0,
        expenseCount: 0,
      }
    );
  } catch (error) {
    throw new Error(`Failed to calculate summary: ${error.message}`);
  }
};

// ✅ Category breakdown
export const getCategoryBreakdownService = async (filters = {}) => {
  try {
    const matchStage = buildQuery(filters);

    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.type",
          categories: {
            $push: {
              category: "$_id.category",
              total: { $round: ["$total", 2] },
              count: "$count",
            },
          },
          total: { $sum: "$total" },
          count: { $sum: "$count" },
        },
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          categories: 1,
          total: { $round: ["$total", 2] },
          count: 1,
        },
      },
      { $sort: { type: 1 } },
    ];

    const result = await Transaction.aggregate(pipeline);

    return result.map((item) => ({
      type: item.type,
      total: item.total,
      count: item.count,
      categories: item.categories.map((cat) => ({
        category: cat.category,
        total: cat.total,
        count: cat.count,
        percentage: calculatePercentage(cat.total, item.total),
      })),
    }));
  } catch (error) {
    throw new Error(`Failed to get category breakdown: ${error.message}`);
  }
};

// ✅ Query builder
export const buildQuery = (filters) => {
  const query = {};
  if (filters.type) query.type = filters.type;
  if (filters.category) query.category = filters.category;

  if (filters.startDate && filters.endDate) {
    query.date = { $gte: filters.startDate, $lte: filters.endDate };
  } else if (filters.startDate) {
    query.date = { $gte: filters.startDate };
  } else if (filters.endDate) {
    query.date = { $lte: filters.endDate };
  }

  return query;
};

// ✅ Validation rules
export const validateBusinessRules = (data) => {
  if (data.amount > 1000000) {
    throw new Error("Amount exceeds maximum limit of $1,000,000");
  }
  if (data.description && !data.description.trim()) {
    throw new Error("Description cannot be empty");
  }
  return true;
};
