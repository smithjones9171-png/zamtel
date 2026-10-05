import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/bank.png";

function Firstpage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!phone.match(/^03\d{9}$/)) {
      setError("Invalid phone number format (e.g., 03xxxxxxxxx)");
      return;
    }
    if (!agreed) {
      setError("You must agree to all policies.");
      return;
    }
    setError("");
    navigate("/feecharges");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-red-600 to-red-700 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 shadow-sm bg-white">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Bank Muscat Logo" className="h-8 w-auto" />
        </div>
      </header>

      {/* Main */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl text-white font-[cursive] mb-2 drop-shadow-md">
            MAXIMUS
          </h1>
          <p className="text-sm sm:text-base text-gray-100 mb-1">
            <span className="font-bold text-xl sm:text-2xl font-[cursive] text-white">
              OMR 20,000
            </span>
          </p>
          <p className="text-xs sm:text-sm text-white mb-4">
            Get a loan only within 3–5 minutes!
          </p>

          {/* Card */}
          <div className="w-full bg-white rounded-2xl shadow-md p-5 sm:p-6 text-left">
            <label className="block text-base sm:text-lg font-semibold text-green-800 mb-2">
              Enter Your Bank Register Number
            </label>
            <input
              type="text"
              placeholder="03xxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mb-3 text-sm"
            />

            {/* Agreement */}
            <div className="flex items-start space-x-2 mb-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="accent-green-600 mt-1"
              />
              <p className="text-xs text-gray-600 leading-snug">
                I have read and agree with{" "}
                <a href="#" className="text-blue-500 underline">
                  Privacy Policy
                </a>
                ,{" "}
                <a href="#" className="text-blue-500 underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-500 underline">
                  User Data Policy
                </a>
              </p>
            </div>

            {/* Error */}
            {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

            {/* Button */}
            <button
              onClick={handleSubmit}
              disabled={!agreed}
              className={`w-full ${
                agreed ? "bg-yellow-400 hover:bg-yellow-500" : "bg-yellow-500"
              } text-white font-semibold py-2 rounded-full transition text-sm sm:text-base`}
            >
              Next
            </button>

            {/* Footer */}
            <div className="text-center text-[10px] sm:text-xs text-gray-500 mt-5 leading-tight">
              <p className="font-semibold">[ Licensed By SECP ]</p>
              <p>
                Powered by Gold Lion Financials Private Limited
                <br />
                Licensed No. SECP/LRD/89/GLFPL/2022-36
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Firstpage;
