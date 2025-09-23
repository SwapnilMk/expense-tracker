# Expense Tracker Application

This is a full-stack expense tracker application built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to add, view, and manage their income and expenses in a visually intuitive way.

## Features

*   **CRUD operations:** Add, view, update, and delete transactions.
*   **Filter transactions:** Filter by type (income/expense), category, and date.
*   **Visual charts:** Pie and bar charts to visualize income vs. expenses.
*   **User-friendly interface:** Built with React and Material-UI (MUI).
*   **State management:** Redux Toolkit for managing application state.
*   **Error handling and validation:** Proper validation and error handling for all APIs and forms.

## Tech Stack

**Backend:**

*   **Framework:** Node.js, Express
*   **Database:** MongoDB
*   **ODM:** Mongoose
*   **API Testing:** Postman
*   **Other:** CORS, dotenv, Winston (for logging)

**Frontend:**

*   **Framework:** React, Vite
*   **UI Library:** Material-UI (MUI)
*   **State Management:** Redux Toolkit
*   **Charts:** MUI X Charts
*   **HTTP Client:** Axios
*   **Routing:** React Router

## Prerequisites

*   Node.js (v18 or higher)
*   npm (v8 or higher)
*   MongoDB (local or Atlas)

## Installation and Setup

### Backend

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/SwapnilMk/expense-tracker.git
    cd expense-tracker/backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `backend` directory and add the following environment variables:

    ```env
    PORT=3000
    NODE_ENV=DEV
    FRONTEND_URL=http://localhost:5173/
    BACKEND_URL=http://localhost:3000/
    MONGODB_URI=your_mongodb_connection_string
    ```

4.  **Run the backend server:**

    ```bash
    npm run dev
    ```

    The server will start on `http://localhost:3000`.

### Frontend

1.  **Navigate to the `frontend` directory:**

    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the `frontend` directory and add the following environment variable:

    ```env
    VITE_API_BASE_URL=http://localhost:3000
    ```

4.  **Run the frontend development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## Available Scripts

### Backend

*   `npm start`: Start the production server.
*   `npm run dev`: Start the development server with Nodemon.
*   `npm run lint`: Lint the code using ESLint.
*   `npm run format`: Format the code using Prettier.

### Frontend

*   `npm run dev`: Start the development server.
*   `npm run build`: Build the application for production.
*   `npm run lint`: Lint the code using ESLint.
*   `npm run preview`: Preview the production build.

## API Endpoints

The following API endpoints are available:

| Method | Endpoint                    | Description                                  |
| ------ | --------------------------- | -------------------------------------------- |
| `GET`    | `/transactions`             | Get all transactions                         |
| `POST`   | `/transactions`             | Add a new transaction                        |
| `GET`    | `/transactions/filter`      | Filter transactions by type, category, or date |
| `PUT`    | `/transactions/:id`         | Update a transaction                         |
| `DELETE` | `/transactions/:id`         | Delete a transaction                         |