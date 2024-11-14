import { Link } from "react-router-dom";
import { useToast } from "./contexts/ToastProvider";

function App() {
  const { addToast } = useToast();

  const handleLoginRedirect = () => {
    addToast("Fill in all fields to receive the One-Time Code.", 3000);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1D2A3D]">
      <div className="text-center p-8 bg-[#3F4A63] rounded-lg w-full max-w-[700px]">
        <h1 className="text-3xl font-semibold text-[#F2F2F2] mb-4">Welcome to main page</h1>
        <p className="text-[#D1D9E6] mb-6">Please click below to go to the login page</p>
        <Link onClick={handleLoginRedirect} to="/login">
          <button className="w-full py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors">
            Go to Login page
          </button>
        </Link>
      </div>
    </div>
  );
}

export default App;
