import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import zustandCreate from "../store/zustandAuth";
import InputField from "../components/InputField";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const { setEmail, setPassword } = zustandCreate();
  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isValidating, setIsValidating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (email || password) {
      setIsValidating(true);

      const timeoutId = setTimeout(() => {
        const newErrors = { email: "", password: "" };
        const emailRegex = /^\S+@\S+\.\S+$/;

        if (email === "") {
          newErrors.email = "This field can't be empty";
        } else if (!emailRegex.test(email)) {
          newErrors.email = "Invalid email format";
        }

        if (password === "") {
          newErrors.password = "This field can't be empty";
        } else if (password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        }

        setErrors(newErrors);
        setIsValidating(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setErrors({ email: "", password: "" });
      setIsValidating(false);
    }
  }, [email, password]);

  const handleEmailChange = (e) => {
    setEmailState(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordState(e.target.value);
  };

  const handleSubmit = () => {
    setEmail(email);
    setPassword(password);
    navigate("/otp");
  };

  const isFormValid = !Object.values(errors).some((error) => error) && email && password;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#83c5be] p-6">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-teal-400">Login</h2>
        <div className="mb-6">
          <InputField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            type="email"
            error={errors.email}
            id={"email"}
          />
        </div>

        <div className="mb-6">
          <InputField
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            error={errors.password}
            id={"password"}
          />
        </div>

        <button
          disabled={!isFormValid || isValidating}
          onClick={handleSubmit}
          className="w-full p-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition duration-300 flex items-center justify-center">
          {isValidating ? <TailSpin height="24px" width="24px" color="white" ariaLabel="loading" radius="1" /> : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Login;
