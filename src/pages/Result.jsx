import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import zustandCreate from "../store/zustandAuth";
import { useToast } from "../contexts/ToastProvider";

const Result = () => {
  const email = zustandCreate((state) => state.email);
  const password = zustandCreate((state) => state.password);
  const otpValid = zustandCreate((state) => state.otpValid);
  const setOtpValid = zustandCreate((state) => state.setOtpValid);
  const navigate = useNavigate();

  const { addToast } = useToast();

  useEffect(() => {
    if (otpValid) addToast("Login Successful! Redirecting to main page.", 4000);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 6000);
    return () => {
      clearTimeout(timeout);
      setOtpValid(false);
    };
  }, [navigate]);

  return (
    <div className="bg-[#264653] min-h-screen flex justify-center items-center p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-[#2F3C47] text-center mb-6">Success!</h2>
        <table className="w-full border-collapse mt-6">
          <thead>
            <tr className="bg-[#2F3C47] text-white text-left text-lg">
              <th className="p-4">Field</th>
              <th className="p-4">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 text-[#4E4E4E] font-semibold">Email</td>
              <td className="p-4 text-[#2F3C47]">{email || "Email"}</td>
            </tr>
            <tr className="border-b">
              <td className="p-4 text-[#4E4E4E] font-semibold">Password</td>
              <td className="p-4 text-[#2F3C47]">{password || "Password"}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-6 text-center text-[#2F3C47] text-sm">
          <p>Redirecting you to the main page...</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
