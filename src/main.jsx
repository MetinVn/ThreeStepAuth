import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import OtpValidation from "./pages/OtpValidation.jsx";
import Result from "./pages/Result.jsx";

import { ToastProvider } from "./contexts/ToastProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<ProtectedRoute children={<OtpValidation />} protectedChildren="otp" />} />
        <Route path="/success" element={<ProtectedRoute children={<Result />} />} />
      </Routes>
    </Router>
  </ToastProvider>
);
