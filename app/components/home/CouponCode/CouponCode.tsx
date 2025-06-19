"use client";

import React, { useState } from "react";

import Container from "../../sharred/Container";

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
    <div className="lg:mt-10 mt-4 bg-primary text-white p-4 lg:p-6">
      {" "}
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between  ">
          {/* Left Section */}
          <div className="flex flex-col items-start text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold">Happy New Year!</h2>
            <p className="text-sm md:text-base mt-2">
              Use this coupon code to get an exclusive discount.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-center md:items-end">
            <div className="bg-white text-[#E21B70] px-6 py-3 rounded-md shadow-md font-bold lg:text-lg text-sm tracking-wider">
              {couponCode}
            </div>
            <button
              className="mt-4 bg-secon bg-secondary  lg:text-base text-xs text-[#333333] lg:px-4 px-2 lg:py-2 py-1 rounded-lg hover:bg-gray-300 transition"
              onClick={handleCopyCode}
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CouponCode;
