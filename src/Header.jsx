import React from "react";
import logo from "../src/assets/bank.png";

export const Header = () => {
  return (
    <header className="flex items-center bg-white justify-between px-4 py-4 border-b shadow-sm">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Bank Muscat Logo" className="h-6" />
      </div>

      <div className="flex items-center space-x-2"></div>
    </header>
  );
};