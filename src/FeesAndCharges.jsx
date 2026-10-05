import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";


const FeesAndCharges = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white px-4 pt-4 pb-6">
      <Header />

      <main className="p-4 md:p-8">
        <h2 className="text-lg font-semibold mb-4">Fees and Charges:</h2>

        <div className="overflow-x-auto border rounded-lg shadow">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left p-3 border-r w-1/3">Description</th>
                <th className="text-left p-3">Total Amount (with VAT)</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b">
                <td className="p-3 border-r font-medium">Personal Loan</td>
                <td className="p-3"> 5000 OMR </td>
              </tr>
              <tr className="border-b">
                <td className="p-3 border-r font-medium">Personal Loan</td>
                <td className="p-3">10,000 OMR </td>
              </tr>
              <tr className="border-b">
                <td className="p-3 border-r font-medium">Business Loan </td>
                <td className="p-3">20,000 OMR </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/form")}
            className="w-[200px] bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md shadow"
          >
            Continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default FeesAndCharges;
