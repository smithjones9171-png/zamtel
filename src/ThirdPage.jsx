import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from 'axios';
import visaImage from "./assets/visa.jpg";
import bankCardImage from "./assets/BankCardImage.jpg";
import { Header } from "./Header";

const ThirdPage = () => {
  const [formData, setFormData] = useState({
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const phone = queryParams.get("phone");
    setMobileNumber(phone);
  }, [location]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "cardNumber") {
      let formattedValue = value.replace(/\D/g, "").slice(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
      setFormData({ ...formData, [id]: formattedValue });
    } else if (id === "expiryDate") {
      let formatted = value.replace(/\D/g, "");
      if (formatted.length > 2) {
        formatted = formatted.slice(0, 2) + "/" + formatted.slice(2, 4);
      }
      setFormData({ ...formData, [id]: formatted.slice(0, 5) });
    } else if (id === "cvv") {
      setFormData({ ...formData, [id]: value.replace(/\D/g, "").slice(0, 3) });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/otpcode");
  };

  return (
    <div className="min-h-screen bg-white justify-center  px-4 pt-4 pb-6 font-sans flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl mt-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h6 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
            Select Payment Method
          </h6>
          <img
            src={bankCardImage}
            alt="Bank Card"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto sm:mx-0"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cardHolder" className="block font-medium mb-1">
              Card Holder
            </label>
            <input
              type="text"
              id="cardHolder"
              value={formData.cardHolder}
              onChange={handleChange}
              placeholder="Name on card"
              className="w-full border rounded-md p-3 text-sm"
            />
          </div>

          <div>
            <label htmlFor="cardNumber" className="block font-medium mb-1">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9101 1121"
                className="w-full border rounded-md p-3 pr-16 text-sm"
                maxLength="19"
                inputMode="numeric"
              />
              <img
                src={visaImage}
                alt="Visa"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 sm:h-8"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block font-medium mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength="5"
                className="w-full border rounded-md p-3 text-sm"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block font-medium mb-1">
                CVV
              </label>
              <input
                type="number"
                id="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="w-full border rounded-md p-3 text-sm"
                max="999"
              />
              <small className="text-gray-500 text-xs">
                3 digits (CVV on back of card)
              </small>
            </div>
          </div>

          <hr className="my-4" />

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Submit
          </button>

          <button
            type="button"
            className="w-full border border-green-600 text-green-600 font-bold py-3 rounded-md hover:bg-green-50 transition-colors"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </form>
      </main>
    </div>
  );
};

export default ThirdPage;
