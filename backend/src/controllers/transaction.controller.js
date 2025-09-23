import {
  createTransactionService,
  getTransactionsService,
  getTransactionByIdService,
  updateTransactionService,
  deleteTransactionService,
  calculateSummaryService,
  getCategoryBreakdownService,
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

    const filters = { page: parseInt(page), limit: parseInt(limit) };
    if (type) filters.type = type;
    if (category) filters.category = category;
    if (startDate) filters.startDate = new Date(startDate);
    if (endDate) filters.endDate = new Date(endDate);

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

// Get single transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID format",
      });
    }

    const transaction = await getTransactionByIdService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Transaction fetched successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Get transaction by ID error:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update existing transaction
export const updateTransaction = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID format",
      });
    }

    const transaction = await updateTransactionService(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
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
    console.error("Update transaction error:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID format",
      });
    }

    await deleteTransactionService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Delete transaction error:", error);
    if (error.message.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get financial summary
export const getSummary = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    const filters = {};
    if (type) filters.type = type;
    if (category) filters.category = category;
    if (startDate) filters.startDate = new Date(startDate);
    if (endDate) filters.endDate = new Date(endDate);

    const summary = await calculateSummaryService(filters);

    res.status(200).json({
      success: true,
      message: "Summary fetched successfully",
      data: summary,
      filters: req.query,
    });
  } catch (error) {
    console.error("Get summary error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get category breakdown analytics
export const getCategoryBreakdown = async (req, res) => {
  try {
    const { type, startDate, endDate } = req.query;

    const filters = {};
    if (type) filters.type = type;
    if (startDate) filters.startDate = new Date(startDate);
    if (endDate) filters.endDate = new Date(endDate);

    const breakdown = await getCategoryBreakdownService(filters);

    res.status(200).json({
      success: true,
      message: "Category breakdown fetched successfully",
      data: breakdown,
      filters: req.query,
    });
  } catch (error) {
    console.error("Get category breakdown error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
