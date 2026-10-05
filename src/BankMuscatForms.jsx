import React from "react";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
const BankMuscatForms = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* Header */}
      <Header/>

      {/* Forms Buttons */}
      <div className="space-y-6 mt-6">
        {[
          "5000 OMR Personal Loan",
          "10000 OMR Personal Loan",
          "20000 Business Loan",
        ].map((text, i) => (
          <button
            key={i}
            onClick={()=>{navigate("/third")}}
            className="block w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md text-center text-sm font-semibold"
          >
            {text}
          </button>
        ))}
      </div>

      {/* Footer Note */}
      <p className="text-sm text-center text-gray-700 mt-8">
        Visit your nearest branch or
        <span className="text-red-600 font-semibold"> call 2479 5555 </span>
        for further details.
      </p>

      
    </div>
  );
};

export default BankMuscatForms;
