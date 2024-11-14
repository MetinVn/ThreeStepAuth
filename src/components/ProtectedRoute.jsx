import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import zustandCreate from "../store/zustandAuth";

const ProtectedRoute = ({ children, protectedChildren = "" }) => {
  const email = zustandCreate((state) => state.email);
  const password = zustandCreate((state) => state.password);
  const otpValid = zustandCreate((state) => state.otpValid);

  const navigate = useNavigate();
  const isAuthenticated = protectedChildren === "otp" ? email && password : otpValid;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default ProtectedRoute;
