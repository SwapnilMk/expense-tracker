import express from "express";
import {
  createTransaction,
  getTransactions,
} from "../controllers/transaction.controller.js";
import {
  validateTransaction,
  validateQueryParams,
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

export default router;
