import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
  getCategoryBreakdown,
} from "../controllers/transaction.controller.js";
import {
  validateTransaction,
  validateQueryParams,
  validateSummaryQuery,
  validateCategoryBreakdownQuery,
  handleValidationErrors,
} from "../middlewares/validation.js";

const router = express.Router();

// Transaction CRUD Routes
router.post(
  "/",
  validateTransaction,
  handleValidationErrors,
  createTransaction,
);

router.get("/", validateQueryParams, handleValidationErrors, getTransactions);

router.get("/:id", getTransactionById);

router.put(
  "/:id",
  validateTransaction,
  handleValidationErrors,
  updateTransaction,
);

router.delete("/:id", deleteTransaction);

// Analytics Routes
router.get(
  "/summary",
  validateSummaryQuery,
  handleValidationErrors,
  getSummary,
);

router.get(
  "/categories",
  validateCategoryBreakdownQuery,
  handleValidationErrors,
  getCategoryBreakdown,
);

export default router;
