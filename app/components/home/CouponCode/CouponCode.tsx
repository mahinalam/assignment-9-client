"use client";

import React, { useState } from "react";

const CouponCode = () => {
  const [copied, setCopied] = useState(false);
  const couponCode = "NEWYEAR2025";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setCopied(true); // Set copied state to true
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#E21B70] text-white p-6 md:p-8 rounded-lg shadow-lg  mx-auto">
      {/* Left Section */}
      <div className="flex flex-col items-start text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-2xl md:text-3xl font-bold">Happy New Year!</h2>
        <p className="text-sm md:text-base mt-2">
          Use this coupon code to get an exclusive discount
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center md:items-end">
        <div className="bg-white text-[#E21B70] px-6 py-3 rounded-md shadow-md font-bold text-lg tracking-wider">
          {couponCode}
        </div>
        <button
          className="mt-4 bg-[#FFD700] text-[#333333] px-4 py-2 rounded-lg hover:bg-[#FFC300] transition"
          onClick={handleCopyCode}
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
    </div>
  );
};

export default CouponCode;
