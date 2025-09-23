import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  PaginatedTransactions,
  Transaction,
  NewTransaction,
  TransactionFilters,
  Summary,
  CategoryBreakdown,
} from "../../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const transactionApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1` }),
  tagTypes: ["Transaction", "Summary", "CategoryBreakdown"],
  endpoints: (builder) => ({
    getTransactions: builder.query<PaginatedTransactions, TransactionFilters>({
      query: (filters) => ({
        url: "/",
        params: filters,
      }),
      transformResponse: (response: { data: PaginatedTransactions }) => response.data,
      providesTags: ["Transaction"],
    }),
    getSummary: builder.query<Summary, Partial<TransactionFilters>>({
      query: (filters) => ({
        url: "/summary",
        params: filters,
      }),
      transformResponse: (response: { data: Summary }) => response.data,
      providesTags: ["Summary"],
    }),
    getCategoryBreakdown: builder.query<CategoryBreakdown[], Partial<TransactionFilters>>({
        query: (filters) => ({
            url: '/categories',
            params: filters,
        }),
        transformResponse: (response: { data: CategoryBreakdown[] }) => response.data,
        providesTags: ['CategoryBreakdown']
    }),
    addTransaction: builder.mutation<Transaction, NewTransaction>({
      query: (transaction) => ({
        url: "/",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags: ["Transaction", "Summary", "CategoryBreakdown"],
    }),
    updateTransaction: builder.mutation<
      Transaction,
      Partial<NewTransaction> & { id: string }
    >({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Transaction", "Summary", "CategoryBreakdown"],
    }),
    deleteTransaction: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction", "Summary", "CategoryBreakdown"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetSummaryQuery,
  useGetCategoryBreakdownQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApiSlice;
