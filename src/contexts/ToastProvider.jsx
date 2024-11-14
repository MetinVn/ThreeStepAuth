import React, { createContext, useContext, useEffect, useState } from "react";

const ToastContext = createContext(null);

const ToastContainer = ({ toasts }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (toasts.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [toasts]);

  return (
    <div
      className={`fixed right-5 z-50 space-y-3 transition-all duration-500 ease-in-out transform pointer-events-none ${
        isVisible ? "bottom-5" : "-bottom-20 "
      }`}>
      {toasts.map((toast) => (
        <div key={toast.id} className="bg-[#f1faee] text-[#1d3557] p-4 rounded-lg shadow-lg">
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message = "", duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
    console.log(id);

    setToasts((prevToasts) => [...prevToasts, { id, message, duration }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
