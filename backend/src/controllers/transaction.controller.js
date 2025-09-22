import {
  createTransactionService,
  getTransactionsService,
} from "../services/transaction.service.js";

// Create new transaction
export const createTransaction = async (req, res) => {
  try {
    const transaction = await createTransactionService(req.body);
    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        description: transaction.description,
        category: transaction.category,
        date: transaction.date,
      },
    });
  } catch (error) {
    console.error("Create transaction error:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all transactions with filters
export const getTransactions = async (req, res) => {
  try {
    const {
      type,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const filters = {
      type: type || undefined,
      category: category || undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const transactionsData = await getTransactionsService(filters);

    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: {
        transactions: transactionsData.transactions,
        total: transactionsData.total,
        summary: transactionsData.summary,
        pagination: {
          current: filters.page,
          pages: Math.ceil(transactionsData.total / filters.limit),
          limit: filters.limit,
        },
        filters: req.query,
      },
    });
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
