import React, { useState } from "react";
import { Header } from "./Header";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode === "123456") {
      setError("");
      alert("OTP Verified!");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-red-600 font-sans">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            OTP Verification
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            We've sent a 6-digit verification code to your registered mobile number
          </p>

          <div className="flex justify-center gap-2 sm:gap-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
              />
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-1">
            Didn't receive the code?{" "}
            <button className="text-red-600 hover:underline">Resend OTP</button>
          </p>
          <p className="text-sm text-gray-400 mb-4">Resend OTP available in 45s</p>

          <button
            onClick={handleVerify}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-full transition-colors"
          >
            Verify
          </button>

          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
