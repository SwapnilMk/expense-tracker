import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import TransactionsPage from "./pages/TransactionsPage";
import AddTransactionPage from "./pages/AddTransactionPage";
import Layout from "./layout/Layout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Layout>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/add-transaction" element={<AddTransactionPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
