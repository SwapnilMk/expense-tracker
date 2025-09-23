import { body, query, validationResult } from "express-validator";

// Transaction validation middleware
export const validateTransaction = [
  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be either income or expense")
    .trim()
    .toLowerCase(),
  body("amount")
    .isFloat({ min: 0.01 })
    .withMessage("Amount must be a positive number greater than 0")
    .toFloat(),
  body("description")
    .isLength({ min: 1, max: 150 })
    .withMessage("Description is required and must be between 1-150 characters")
    .trim()
    .escape(),
  body("category")
    .isIn([
      "Salary",
      "Bonus",
      "Freelancing / Consulting",
      "Business",
      "Rental Income",
      "Investments",
      "Dividends",
      "Interest Income",
      "Refunds / Reimbursements",
      "Gifts",
      "Other Income",
      "Groceries",
      "Transport",
      "Utilities",
      "Rent",
      "Medical",
      "Insurance",
      "Dining",
      "Entertainment",
      "Shopping",
      "Subscriptions",
      "Travel",
      "Debt Repayment",
      "Loan EMI",
      "Taxes",
      "Savings & Investments",
      "Education",
      "Childcare",
      "Gifts & Donations",
      "Family & Kids",
      "Personal Care",
      "Household",
      "Pet Care",
      "Other Expense",
    ])
    .withMessage("Invalid category selected")
    .trim(),
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be in valid ISO format")
    .toDate(),
];

// Query parameters validation for listing transactions
export const validateQueryParams = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1-100"),
  query("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  query("category")
    .optional()
    .isIn([
      "Salary",
      "Bonus",
      "Freelancing / Consulting",
      "Business",
      "Rental Income",
      "Investments",
      "Dividends",
      "Interest Income",
      "Refunds / Reimbursements",
      "Gifts",
      "Other Income",
      "Groceries",
      "Transport",
      "Utilities",
      "Rent",
      "Medical",
      "Insurance",
      "Dining",
      "Entertainment",
      "Shopping",
      "Subscriptions",
      "Travel",
      "Debt Repayment",
      "Loan EMI",
      "Taxes",
      "Savings & Investments",
      "Education",
      "Childcare",
      "Gifts & Donations",
      "Family & Kids",
      "Personal Care",
      "Household",
      "Pet Care",
      "Other Expense",
    ])
    .withMessage("Invalid category filter"),
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be valid ISO format"),
  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be valid ISO format"),
];

// Summary query validation
export const validateSummaryQuery = [
  query("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  query("category")
    .optional()
    .isIn([
      "Salary",
      "Bonus",
      "Freelancing / Consulting",
      "Business",
      "Rental Income",
      "Investments",
      "Dividends",
      "Interest Income",
      "Refunds / Reimbursements",
      "Gifts",
      "Other Income",
      "Groceries",
      "Transport",
      "Utilities",
      "Rent",
      "Medical",
      "Insurance",
      "Dining",
      "Entertainment",
      "Shopping",
      "Subscriptions",
      "Travel",
      "Debt Repayment",
      "Loan EMI",
      "Taxes",
      "Savings & Investments",
      "Education",
      "Childcare",
      "Gifts & Donations",
      "Family & Kids",
      "Personal Care",
      "Household",
      "Pet Care",
      "Other Expense",
    ])
    .withMessage("Invalid category filter"),
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be valid ISO format"),
  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be valid ISO format"),
];

// Category breakdown query validation
export const validateCategoryBreakdownQuery = [
  query("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be valid ISO format"),
  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("End date must be valid ISO format"),
];

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};
