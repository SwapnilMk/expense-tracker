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

// Analytics Routes must come before the /:id route
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

router.get("/:id", getTransactionById);

router.put(
  "/:id",
  validateTransaction,
  handleValidationErrors,
  updateTransaction,
);

router.delete("/:id", deleteTransaction);

export default router;
