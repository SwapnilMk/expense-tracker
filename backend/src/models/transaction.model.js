import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Transaction type is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
      get: (v) => parseFloat(v.toFixed(2)),
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [150, "Description cannot exceed 150 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
        "salary",
        "bonus",
        "investment",
        "other_income",
        "groceries",
        "transport",
        "entertainment",
        "utilities",
        "medical",
        "shopping",
        "dining",
        "rent",
        "other_expense",
      ],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

//indexing

transactionSchema.index({ type: 1, category: 1 });
transactionSchema.index({ date: -1 });
transactionSchema.index({ userId: 1 }); 

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
