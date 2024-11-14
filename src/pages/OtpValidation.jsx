import React, { useRef, useEffect, useState } from "react";
import zustandCreate from "../store/zustandAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastProvider";

const correctOTP = "123456";
let numberOfDigits = 6;

const OtpValidation = () => {
  const otpValid = zustandCreate((state) => state.otpValid);
  const setOtpValid = zustandCreate((state) => state.setOtpValid);
  const email = zustandCreate((state) => state.email);
  const password = zustandCreate((state) => state.password);

  const { addToast } = useToast();

  useEffect(() => {
    if (email && password) addToast("Check your email for otp code.", 3000);
  }, []);

  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));

  const [otpError, setOtpError] = useState(null);
  const otpInputRef = useRef([]);

  const handleChange = (value, index) => {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpInputRef.current[index + 1].focus();
    }
  };

  const handleBackspaceAndArrowKeys = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpInputRef.current[index - 1].focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      otpInputRef.current[index - 1].focus();
    }
    if (e.key === "ArrowRight" && index < numberOfDigits - 1) {
      otpInputRef.current[index + 1].focus();
    }
  };

  useEffect(() => {
    const otpString = otp.join("");

    if (otpString !== "" && otpString !== correctOTP) {
      setOtpError(true);
      setOtpValid(false);
    } else if (otpString === correctOTP) {
      setOtpError(null);
      setOtpValid(true);
    }
  }, [otp]);

  const handleOtp = () => {
    if (otp.includes("") || otp.length !== numberOfDigits) {
      setOtpError("Please fill in all OTP fields.");
      return;
    }

    if (otpValid) {
      navigate("/success");
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#036666]">
      <div className="bg-[#1e2a34] p-8 rounded-xl shadow-lg w-full max-w-fit">
        <h2 className="text-2xl font-bold text-white text-center mb-4">OTP Input Validation</h2>
        <p className="text-white mb-4">Correct OTP(for testing purpose) : "123456"</p>
        <p className="text-white mb-4">One Time Password (OTP)</p>
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyUp={(e) => handleBackspaceAndArrowKeys(e, index)}
              ref={(reference) => (otpInputRef.current[index] = reference)}
              className={`w-16 h-16 text-center text-2xl bg-[#34495e] text-white border rounded-md focus:outline-none transition duration-300 ${
                digit === "" && otpError ? "border-[#ff3838]" : "border-[#2c3e50]"
              } focus:border-[#16a085]`}
            />
          ))}
        </div>
        <p className={`text-lg text-[#ff0000] text-center mt-4 ${otpError ? "block" : "hidden"}`}>{otpError || ""}</p>
        <button
          onClick={handleOtp}
          className="w-full py-2 mt-4 bg-teal-500 text-white rounded-md font-semibold hover:bg-teal-600 transition duration-200">
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpValidation;
